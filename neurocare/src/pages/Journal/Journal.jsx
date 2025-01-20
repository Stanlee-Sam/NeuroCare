import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import SentimentChart from "../../Components/Charts/LineChart";
import StressLevels from "../../Components/Charts/BarChart";
import SentimentCategories from "../../Components/Charts/PieChart";

const Journal = () => {
  const [selectedChart, setSelectedChart]  = useState("line")

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return <SentimentChart />
      case "bar":
        return <StressLevels/>
      case "pie":
        return <SentimentCategories />
      default:
        return null;

    }
  }


  const sentiments = [
    {
      id: 1,
      emoji: "🙂",
      type : "Positive",
      date : "24th Nov 2024",
      time : "10:30 AM",
      sentiment: "You seem to be feeling positive today!",
      desc: "Keep up the great work",
      score: 8 / 10,
    },
    {
      id: 2,
      emoji: "🙂",
      type : "Neutral",
      date : "23th Nov 2024",
      time : "12:30 PM",
      sentiment: "Your feeling neutral today!",
      desc: "Let's see how tomorrow feels",
      score: 5 / 10,
    },
    {
      id: 3,
      emoji: "🙂",
      type : "Negative",
      date : "22nd Nov 2024",
      time : "9:30 AM",
      sentiment: "It looks like you're feeling down.Take care!",
      desc: "Remember, it's ok to feel this way.Take a break",
      score: 2 / 10,
    },
  ];
  return (
    <div className="flex bg-[#D9D9D9]  ">
      <Sidebar />
      <div className="p-4 text-2xl  flex-1 w-full ">
        <div>
          <Topbar />
        </div>
        <div className="pl-10 md:pl-14 flex flex-col gap-3">
          <div>
            <h1 className="text-center text-[20px] font-bold">
              Sentiment Journal
            </h1>
            <p className="text-center text-[10px]">
              Track your emotions through daily reflections
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg flex flex-col gap-3 ">
            <div>
              <h3 className="font-light text-[15px]">App</h3>
              <p className="font-bold text-[15px] ">
                How are you feeling today? Let us know!
              </p>
            </div>
            <div>
              <input
                className="bg-gray-700 text-white w-full rounded-lg text-[12px] min-h-[30vh] p-2 "
                placeholder="Write a note...(e.g, I'm feeling stressed about work today)"
              ></input>
            </div>
            <div className="grid justify-end items-center ">
              <button className="bg-[#77DD77] text-[15px] p-2 rounded-lg font-bold hover:bg-[#608BC1] hover:text-white ">
                Analyze
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-center text-[15px] font-bold">Feedback</h3>
          </div>

          <div className="bg-white p-2 rounded-lg ">
            {sentiments.slice(0, 1).map((sentiment) => (
              <div
                key={sentiment.id }
                className="flex flex-row justify-evenly items-center bg-green-500 rounded-lg p-3 w-full"
              >
                <div className="text-[30px]">{sentiment.emoji}</div>
                <div>
                  <div className="font-bold text-[20px] text-center">
                    {sentiment.sentiment}
                  </div>
                  <div className="text-center text-[15px]">
                    {sentiment.desc}
                  </div>
                </div>
                <div className="font-bold">{sentiment.score}</div>
              </div>
            ))}
          </div>
          <div>
          <h3 className="text-center text-[15px] font-bold">Sentiment Analytics</h3>
          </div>
          <div>
            <div className="flex flex-col gap-3 items-center ">
              <div className="flex flex-row gap-1">
                <p className="text-[15px]">Choose chart type : </p>
                <select name="" value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)} id="" className="rounded-lg text-[15px] p-2 font-light">
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              <div className="md:w-[90%] w-full">{renderChart()}</div>

            </div>
          </div>
          <div>
          <h3 className="text-center text-[15px] font-bold">Sentiment History</h3>
          </div>
          <div className = "flex flex-row gap-3 flex-wrap justify-center">
            {sentiments.map(sentiment => (
              <div className = "flex flex-col gap-1 p-2 text-white items-center bg-[#608BC1] rounded-lg w-full md:w-[20%] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl hover:bg-gray-500 hover:text-black cursor-pointer" key = {sentiment.id}>
                <div>{sentiment.emoji}</div>
                <div className = "font-bold">{sentiment.type}</div>
                <div className = "text-[20px]">{sentiment.score}</div>
                <div className = "text-[15px]">{sentiment.date},{sentiment.time}</div>
                <div className = "text-[10px]">{sentiment.desc}</div>
              </div>
            ))}
            <div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
