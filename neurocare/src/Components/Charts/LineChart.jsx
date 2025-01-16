"use client";

import { SlOptions } from "react-icons/sl";

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

const data = [
  {
    name: "Sun",
    sentiment: 0,
  },
  {
    name: "Mon",
    sentiment: 0.15,
  },
  {
    name: "Tue",
    sentiment: 0,
  },
  {
    name: "Wed",
    sentiment: -0.35,
  },
  {
    name: "Thur",
    sentiment: 0,
  },
  {
    name: "Fri",
    sentiment: 0.8,
  },
  {
    name: "Sat",
    sentiment: 0,
  },
];

const SentimentChart = () => {
  return (
    <div className="bg-white max-w-full rounded-lg p-4 flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold ">Sentiment Trends</h1>
        <div>
          <SlOptions />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
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
            contentStyle={{ borderRadius: "10px", background: "#fff", fontWeight : "500" }}
          />
          <Legend wrapperStyle={{ fontSize: "10px", fontWeight: "500" }} />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#608BC1"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
