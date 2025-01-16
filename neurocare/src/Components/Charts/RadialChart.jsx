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
    fill: "#FF5733",
  },
  {
    name: "NeuroBot",
    count: 39,
    fill: "#00FFFF",
  },
  {
    name: "Dashboard",
    count: 55,
    fill: "#581845",
  },
  
];



const FeautureInteraction = () => {
  return (
    <div className="bg-white  rounded-lg p-4 flex flex-col gap-2 relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
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
          <div className="w-2 h-2 bg-[#8884d8] rounded-lg"></div>
          <h3 className="text-[10px] font-semibold flex items-center gap-1">
          <IoJournal />

            Mood Tracking</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#FF5733] rounded-lg"></div>
          <h3 className="text-[10px] font-semibold flex items-center gap-1">
          <FaCalendarAlt />
            Calendar</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#00FFFF] rounded-lg"></div>
          <h3 className="text-[10px] font-semibold flex items-center gap-1">
          <FaRobot />
          NeuroBot</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#581845] rounded-lg"></div>
          <h3 className="text-[10px] font-semibold flex items-center gap-1">
          <MdDashboard />
          Dashboard</h3>
        </div>
      </div>
    </div>
  );
};

export default FeautureInteraction;
