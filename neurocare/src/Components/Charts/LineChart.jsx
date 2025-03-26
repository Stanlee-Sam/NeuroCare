"use client";

import { SlOptions } from "react-icons/sl";
import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const SentimentChart = ({ journalEntries = [] }) => {
  const [timeSpan, setTimeSpan] = useState("daily");

  useEffect(() => {
    console.log("Journal Entries Updated:", journalEntries);
  }, [journalEntries]);

  useEffect(() => {
    setTimeSpan("daily"); 
  }, [journalEntries]);

  

  const formatData = (entries, period) => {
    console.log("Entries received in formatData:", entries);
    const groupedData = {};
  
    // Get the current date in the user's timezone
    const now = new Date();
    const today = new Date().toLocaleDateString("en-US", { timeZone: "Africa/Nairobi" });
  
    // Get current week & month info
    const currentWeek = Math.ceil(now.getDate() / 7); // Week of the month 
    const currentMonth = now.getMonth(); // 0 = Jan, 1 = Feb, etc.
    const currentYear = now.getFullYear();
  
    entries.forEach((entry) => {
      console.log("Processing entry:", entry);
      const date = new Date(entry.createdAt);
  
      // Convert to user's timezone
      const localDate = new Date(date.toLocaleString("en-US", { timeZone: "Africa/Nairobi" }));
  
      // Get date info for comparison
      const entryDate = localDate.toLocaleDateString("en-US", { timeZone: "Africa/Nairobi" });
      const entryWeek = Math.ceil(localDate.getDate() / 7);
      const entryMonth = localDate.getMonth();
      const entryYear = localDate.getFullYear();
  
      let key;
      if (period === "daily") {
        if (entryDate !== today) return; // Only show today's entries
        key = `${localDate.getHours()}:00`; // Hourly format
      } else if (period === "weekly") {
        if (entryWeek !== currentWeek || entryMonth !== currentMonth || entryYear !== currentYear) return; // Show only this week's data
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        key = weekdays[localDate.getDay()]; // Group by weekday
      } else if (period === "monthly") {
        if (entryMonth !== currentMonth || entryYear !== currentYear) return; // Show only this month's data
        key = `Week ${entryWeek}`; // Group by weeks within the current month
      }
  
      console.log("Grouping Entry:", entry.id, "| Date:", localDate, "| Key:", key);
  
      if (!groupedData[key]) {
        groupedData[key] = { name: key, sentiment: 0, count: 0 };
      }
      groupedData[key].sentiment += entry.sentimentScore;
      groupedData[key].count += 1;
    });
  
    let formattedData = Object.values(groupedData).map((item) => ({
      name: item.name,
      sentiment: item.count > 0 ? Number((item.sentiment / item.count).toFixed(2)) : 0,
    }));
  
    //  Apply proper sorting logic based on period
    if (period === "weekly") {
      const weekdaysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      formattedData.sort((a, b) => weekdaysOrder.indexOf(a.name) - weekdaysOrder.indexOf(b.name));
    } else if (period === "monthly") {
      formattedData.sort((a, b) => {
        const weekNumberA = parseInt(a.name.replace(/\D/g, ""), 10); 
        const weekNumberB = parseInt(b.name.replace(/\D/g, ""), 10);
        return weekNumberA - weekNumberB;
      });
    }
    console.log("Sorted Weekly Data:", formattedData);
    console.log("Sorted Monthly Data:", formattedData);
    
    console.log("Formatted Data:", formattedData);
    return formattedData;
  };
  

  const chartData = useMemo(() => {
    console.log("Processing journalEntries:", journalEntries);
    if (journalEntries.length > 0) {
      const sortedEntries = [...journalEntries].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      const formatted = formatData(sortedEntries, timeSpan);

      if (timeSpan === "daily") {
        return formatted.reverse();
      }

      return formatted
    }
  
    return [{ name: "No Data" }];
  }, [journalEntries, timeSpan]);

  console.log("Chart Data Before Render:", chartData);

  return (
    <div className="bg-white max-w-full rounded-lg p-4 flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Sentiment Trends</h1>
        <div className="flex justify-end mb-2">
          <select
            value={timeSpan}
            onChange={(e) => setTimeSpan(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 text-sm cursor-pointer hover:bg-black hover:text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <SlOptions />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartData.length > 0 ? (
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              fontSize={15}
              fontWeight={500}
              axisLine={{ stroke: "#dcdcdc" }}
              tickLine={false}
            />
            <YAxis
              fontSize={15}
              fontWeight={500}
              domain={[-1, 1]}
              axisLine={{ stroke: "#dcdcdc" }}
              tickLine={false}
              label={{
                value: "Sentiment",
                angle: -90,
                position: "insideLeft",
                fontSize: 14,
              }}
            />
            <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
            <Tooltip
              cursor={{ stroke: "#ccc", strokeWidth: 2 }}
              contentStyle={{
                borderRadius: "10px",
                background: "#fff",
                fontWeight: "500",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px", fontWeight: "500" }} />
            <Line type="monotone" dataKey="sentiment" stroke="#608BC1" activeDot={{ r: 8 }} />
          </LineChart>
        ) : (
          <p className="text-center">No data available yet....</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

SentimentChart.propTypes = {
  journalEntries: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      sentimentScore: PropTypes.number.isRequired,
    })
  ),
};

export default SentimentChart;