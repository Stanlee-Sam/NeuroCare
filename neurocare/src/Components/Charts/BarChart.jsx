"use client";

import { SlOptions } from "react-icons/sl";
import { useState } from "react";

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
  if (active && payload && label) {
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
        <p style={{ color: payload[0].fill, fontWeight: 500 }}>
          Level: {payload[0].value}%
        </p>
      </div>
    );
  }
};

const barColor = (value) => {
  if (value <= 49) return "#4CAF50";
  if (value === 50) return "#FFA500";
  return "#F44336";
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
  const [timeSpan, setTimeSpan] = useState("weekly");

  const getData = () => {
    switch (timeSpan) {
      case "daily":
        return dataDaily;
      case "monthly":
        return dataMonthly;
      default:
        return dataWeekly;
    }
  };

  const data = getData();

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
        <div>
          <SlOptions />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
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
            label={{
              value: "Percentage",
              angle: -90,
              position: "insideLeft",
              fontSize: 14,
            }}
          />
          <Tooltip content={customTooltip} />

          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="Level"
            legendType="circle"
            radius={[10, 10, 0, 0]}
            fill={({ value }) => barColor(value)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor(entry.Level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StressLevels;
