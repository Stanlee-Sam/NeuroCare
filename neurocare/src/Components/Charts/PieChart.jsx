"use client"

import { useState } from "react";
import { SlOptions } from "react-icons/sl";

import { PieChart, Pie, Sector, ResponsiveContainer,Legend } from 'recharts';

const data = [
  { name: 'Happy',emoji: "😃", value: 400, fill : "#28a745" },
  { name: 'Sad ',emoji: "😔", value: 100 , fill: "#dc3545" },
  { name: 'Neutral ',emoji: "😐", value: 300,  fill: "#B76529" },
  { name: 'Anxious ',emoji: "😰", value: 200, fill: "#18A0FB" },
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
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
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

 

const SentimentCategories = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    }; 

  return (
    <div className="bg-white h-full rounded-lg p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold ">Sentiment Categories</h1>
            <div><SlOptions /></div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
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
