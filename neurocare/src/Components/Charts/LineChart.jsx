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

    entries.forEach((entry) => {
      console.log("Processing entry:", entry);
      const date = new Date(entry.createdAt);

      const localDate = new Date(date.toLocaleString("en-US", { timeZone: "Africa/Nairobi" }));

      let key;
      if (period === "daily") {
        key = `${localDate.getHours()}:00`; 
      } else if (period === "weekly") {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        key = weekdays[localDate.getDay()]; 
      } else if (period === "monthly") {
        key = `Week ${Math.ceil(localDate.getDate() / 7)}`; 
      }

      console.log("Grouping Entry:", entry.id, "| Date:", localDate, "| Key:", key);

      if (!groupedData[key]) {
        groupedData[key] = { name: key, sentiment: 0, count: 0 };
      }
      groupedData[key].sentiment += entry.sentimentScore;
      groupedData[key].count += 1;
    });

    const formattedData = Object.values(groupedData).map((item) => ({
      name: item.name,
      sentiment: item.count > 0 ? Number((item.sentiment / item.count).toFixed(2)) : 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); 

    console.log("Formatted Data:", formattedData);
    return formattedData;
  };

  const chartData = useMemo(() => {
    console.log("Processing journalEntries:", journalEntries);
    if (journalEntries.length > 0) {
      // Ensure data is sorted by createdAt (ascending)
      const sortedEntries = [...journalEntries].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
  
      return formatData(sortedEntries, timeSpan);
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