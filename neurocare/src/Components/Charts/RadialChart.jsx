"use client";
import { MdDashboard } from "react-icons/md";
import { IoJournal } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FaCalendarAlt } from "react-icons/fa";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 193,
    fill: "white",
  },
  {
    name: "Mood Tracking",
    count: 52,
    fill: "#8884d8",
  },
  
  {
    name: "Calendar",
    count: 47,
    fill: "#83a6ed",
  },
  {
    name: "NeuroBot",
    count: 39,
    fill: "#8dd1e1",
  },
  {
    name: "Dashboard",
    count: 55,
    fill: "#82ca9d",
  },
  
];



const FeautureInteraction = () => {
  return (
    <div className= "relative bg-white w-full rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold ">Feature Interaction</h1>
        <div>
          <SlOptions />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="100%"
          barSize={40}
          data={data}
        >
          <RadialBar
            minAngle={15}
            background

            dataKey="count"
          />
         
        </RadialBarChart>
      </ResponsiveContainer>
     
      
      
      
      <img className="absolute top-[40%] left-[41.5%] w-[70px]" src="../../../src/assets/features.png" alt="" />
      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-lg"></div>
          <h3 className="text-sm font-semibold flex items-center gap-1">
          <IoJournal />

            Mood Tracking</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-lg"></div>
          <h3 className="text-sm font-semibold flex items-center gap-1">
          <FaCalendarAlt />
            Calendar</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-lg"></div>
          <h3 className="text-sm font-semibold flex items-center gap-1">
          <FaRobot />
          NeuroBot</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-lg"></div>
          <h3 className="text-sm font-semibold flex items-center gap-1">
          <MdDashboard />
          Dashboard</h3>
        </div>
      </div>
    </div>
  );
};

export default FeautureInteraction;
