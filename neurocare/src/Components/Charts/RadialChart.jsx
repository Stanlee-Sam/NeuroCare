"use client"

import { SlOptions } from "react-icons/sl";

const LineChart = () => {
  return (
    <div className="bg-white h-full rounded-lg w-full p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold ">Sentiment Trends</h1>
            <div><SlOptions /></div>
        </div>
      
    </div>
  )
}

export default LineChart
