"use client";

// import { SlOptions } from "react-icons/sl";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../Components/Firebase/firebase.js";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const dataDaily = [
  { name: "12 AM", Level: 50 },
  { name: "2 AM", Level: 81 },
  { name: "4 AM", Level: 24 },
  { name: "6 AM", Level: 27 },
  { name: "8 AM", Level: 89 },
  { name: "10 AM", Level: 80 },
  { name: "12 PM", Level: 50 },
  { name: "2 PM", Level: 81 },
  { name: "4 PM", Level: 24 },
  { name: "6 PM", Level: 27 },
  { name: "8 PM", Level: 89 },
  { name: "10 PM", Level: 80 },
];
const dataWeekly = [
  {
    name: "Sun",
    Level: 50,
  },
  {
    name: "Mon",
    Level: 81,
  },
  {
    name: "Tue",
    Level: 24,
  },
  {
    name: "Wed",
    Level: 27,
  },
  {
    name: "Thur",
    Level: 89,
  },
  {
    name: "Fri",
    Level: 80,
  },
  {
    name: "Sat",
    Level: 50,
  },
];

const dataMonthly = [
  {
    name: "Week 1",
    Level: 50,
  },
  {
    name: "Week 2",
    Level: 81,
  },
  {
    name: "Week 3",
    Level: 24,
  },
  {
    name: "Week 4",
    Level: 27,
  },
];

const customTooltip = ({ active, payload, label }) => {
  if (active && payload?.length > 0) {
    return (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          border: "1px solid lightgray",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 5 }}>{label}</p>
        <p style={{ color: payload[0]?.fill || "#000", fontWeight: 500 }}>
          Level: {payload[0]?.value ?? "N/A"}%
        </p>
      </div>
    );
  }
  return null;
};

const barColor = (value) => {
  if (value >= 70) return "#F44336";
  if (value >= 40) return "#FFA500";
  return "#4CAF50";
};

const CustomLegend = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "#4CAF50",
            borderRadius: "50%",
          }}
        ></div>
        <span className="text-[10px]">Positive</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "#FFA500",
            borderRadius: "50%",
          }}
        ></div>
        <span className="text-[10px]">Neutral</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "#F44336",
            borderRadius: "50%",
          }}
        ></div>
        <span className="text-[10px]">Negative</span>
      </div>
    </div>
  );
};

const StressLevels = () => {
  const [timeSpan, setTimeSpan] = useState("daily");
  const [stressData, setStressData] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchStressLevels = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        if (!token) {
          console.error("No auth token found");
          return;
        }
        const response = await axios.get(
          `${API_BASE_URL}/api/journal/chart?timeSpan=${timeSpan}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Raw API Response:", response.data);

        if (!response.data || response.data.length === 0) {
          console.warn("No data returned from API, using fallback dataset.");
          setStressData(getFallbackData(timeSpan));
          return;
        }

        let aggregatedData = aggregateData(response.data, timeSpan);
        console.log("Processed Stress Data:", aggregatedData);

        setStressData(aggregatedData);
      } catch (error) {
        console.error("Error fetching stress levels:", error);
        setStressData(getFallbackData(timeSpan));
      }
    };

    fetchStressLevels();
  }, [timeSpan]);

  

  const aggregateData = (data, timeSpan) => {
    let groupedData = {};

    // Get the current date in the desired timezone
    const now = new Date();
    const localNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
    );
    const currentDateString = localNow.toLocaleDateString("en-US", {
      timeZone: "Africa/Nairobi",
    });
    const currentMonth = localNow.getMonth();
    const currentYear = localNow.getFullYear();
    // Define the current week as the week number within the month
    const currentWeek = Math.ceil(localNow.getDate() / 7);

    data.forEach((entry) => {
      const entryDate = new Date(entry.createdAt);
      const localEntry = new Date(
        entryDate.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
      );

      let key = "Unknown";

      if (timeSpan === "daily") {
        // Only include entries from today.
        const entryDateString = localEntry.toLocaleDateString("en-US", {
          timeZone: "Africa/Nairobi",
        });
        if (entryDateString !== currentDateString) return;
        // Group by the entry name
        key = entry.name;
      } else if (timeSpan === "weekly") {
        // Only include entries that belong to the current week.
        const entryWeek = Math.ceil(localEntry.getDate() / 7);
        if (
          localEntry.getMonth() !== currentMonth ||
          localEntry.getFullYear() !== currentYear ||
          entryWeek !== currentWeek
        ) {
          return;
        }
        // Group by weekday
        key = localEntry.toLocaleDateString("en-US", { weekday: "short" });
      } else if (timeSpan === "monthly") {
        // Only include entries from the current month
        if (
          localEntry.getMonth() !== currentMonth ||
          localEntry.getFullYear() !== currentYear
        ) {
          return;
        }
        // Group by week of the month
        key = `Week ${Math.ceil(localEntry.getDate() / 7)}`;
      }

      // Group and accumulate values
      if (!groupedData[key]) {
        groupedData[key] = { total: 0, count: 0 };
      }
      if (typeof entry.Level === "number" && !isNaN(entry.Level)) {
        const normalizedLevel = Math.min(entry.Level, 100);
        groupedData[key].total += normalizedLevel;
        groupedData[key].count += 1;
      }
    });

    return Object.keys(groupedData).map((key) => {
      const avgStress =
        groupedData[key].count > 0
          ? groupedData[key].total / groupedData[key].count
          : 0;
      return { name: key, Level: Math.round(avgStress) };
    });
  };

 

  const getFallbackData = (timeSpan) => {
    switch (timeSpan) {
      case "daily":
        return dataDaily;
      case "weekly":
        return dataWeekly;
      case "monthly":
        return dataMonthly;
      default:
        return [];
    }
  };

  const getData = () => {
    if (stressData.length > 0) {
      return stressData.map((entry) => ({
        ...entry,
        Level: entry.Level || 0, // Ensure Level is always a number
      }));
    }
    return [];
  };

  return (
    <div className="bg-white max-w-full  rounded-lg p-4 flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl ">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold ">Stress Levels</h1>
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
        {/* <div>
          <SlOptions />
        </div> */}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          key={timeSpan}
          width={500}
          height={300}
          data={getData()}
          barSize={20}
          margin={{
            top: 10,
            right: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            fontSize={15}
            fontWeight={500}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            fontSize={15}
            fontWeight={500}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            label={{
              value: "Percentage",
              angle: -90,
              position: "insideLeft",
              fontSize: 14,
            }}
          />
          <Tooltip content={customTooltip} />

          <Legend content={<CustomLegend />} />
          <Bar dataKey="Level" radius={[10, 10, 0, 0]}>
            {getData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor(entry.Level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StressLevels;
