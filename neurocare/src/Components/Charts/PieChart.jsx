

"use client"

import { useState } from "react";
import { SlOptions } from "react-icons/sl";

import { PieChart, Pie, Sector, ResponsiveContainer,Legend } from 'recharts';

const data = [
  { name: 'Happy',emoji: "😃", value: 500, fill : "#28a745" },
  { name: 'Sad ',emoji: "😔", value: 100 , fill: "#dc3545" },
  { name: 'Neutral ',emoji: "😐", value: 400,  fill: "#B76529" },
  { name: 'Anxious ',emoji: "😰", value: 100, fill: "#18A0FB" },
]
const dataWeekly = [
  { name: 'Happy',emoji: "😃", value: 400, fill : "#28a745" },
  { name: 'Sad ',emoji: "😔", value: 100 , fill: "#dc3545" },
  { name: 'Neutral ',emoji: "😐", value: 300,  fill: "#B76529" },
  { name: 'Anxious ',emoji: "😰", value: 200, fill: "#18A0FB" },
];
const dataMonthly = [
  { name: 'Happy',emoji: "😃", value: 350, fill : "#28a745" },
  { name: 'Sad ',emoji: "😔", value: 200 , fill: "#dc3545" },
  { name: 'Neutral ',emoji: "😐", value: 250,  fill: "#B76529" },
  { name: 'Anxious ',emoji: "😰", value: 200, fill: "#18A0FB" },

]

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 1) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={15}>
        <tspan style={{ fontSize: "16px", fontWeight: "bold" }}>{payload.name}</tspan>
        <tspan style={{ fontSize: "20px", fontWeight: "normal", marginLeft: "5px" }}>
          {payload.emoji}
        </tspan>        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
<path d={`M${sx},${sy}L${ex},${ey}`} stroke={fill} fill="none" />        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fontSize={10} fontWeight={700} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fontSize={10} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

 

const SentimentCategories = () => {

    const [timeSpan, setTimeSpan] = useState("weekly");

    const getData = () => {
      switch (timeSpan) {
        case "daily":
          return data;
        case "monthly":
          return dataMonthly;
        default:
          return dataWeekly;
      }
    }


    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    }; 

  return (
    <div className="bg-white  rounded-lg p-4 flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
        <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold ">Sentiment Categories</h1>
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
        </div>            <div><SlOptions /></div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
        <PieChart width={500} height={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={getData()}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
          <Legend verticalAlign="bottom" wrapperStyle={{fontSize : "10px"}} />
        </PieChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default SentimentCategories
