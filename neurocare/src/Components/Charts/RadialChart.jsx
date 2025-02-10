"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { IoJournal } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FaCalendarAlt } from "react-icons/fa";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const FeatureInteraction = () => {
  const [data, setData] = useState([]);

  // Function to fetch feature usage data
  const fetchFeatureUsage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feature-usage"); // Backend API
      const featureData = response.data.map((item) => ({
        name: item.feature,
        count: item.count,
        fill: getColorForFeature(item.feature), // Assign colors
      }));

      setData(featureData);
    } catch (error) {
      console.error("Error fetching feature usage data:", error);
    }
  };

  // Function to track feature usage
  const trackFeatureUsage = async (featureName) => {
    try {
      await axios.post("http://localhost:5000/api/track-feature", { feature: featureName });
      fetchFeatureUsage(); // Refresh chart
    } catch (error) {
      console.error("Error tracking feature usage:", error);
    }
  };

  useEffect(() => {
    fetchFeatureUsage(); // Fetch data when component mounts
  }, []);

  // Function to get colors for each feature
  const getColorForFeature = (feature) => {
    const colors = {
      "Mood Tracking": "#8884d8",  
      "Calendar": "#FF5733",       
      "NeuroBot": "#00FFFF",       
      "Dashboard": "#581845",      
    };
    return colors[feature] || "#888"; // Default color
  };

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-2 relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Feature Interaction</h1>
        <div>
          <SlOptions />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={40} data={data}>
          <RadialBar minAngle={15} background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>


      <div className="grid grid-cols-2 gap-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1 cursor-pointer" onClick={() => trackFeatureUsage(item.name)}>
            <div className="w-2 h-2 rounded-lg" style={{ backgroundColor: item.fill }}></div>
            <h3 className="text-[10px] font-semibold flex items-center gap-1">
              {item.name === "Mood Tracking" && <IoJournal />}
              {item.name === "Calendar" && <FaCalendarAlt />}
              {item.name === "NeuroBot" && <FaRobot />}
              {item.name === "Dashboard" && <MdDashboard />}
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureInteraction;
