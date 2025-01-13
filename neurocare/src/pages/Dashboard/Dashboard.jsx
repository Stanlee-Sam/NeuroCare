import StressLevels from "../../Components/Charts/BarChart";
import SentimentChart from "../../Components/Charts/LineChart";
import SentimentCategories from "../../Components/Charts/PieChart";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { BiSolidUpArrow } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="flex  bg-[#D9D9D9] overflow-x-hidden ">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">
        {/* Top-bar */}
        <div>
          <Topbar />
        </div>
        <div className="space-y-4">
          <div className="welcome">
            <h1 className="text-center font-bold my-2 text-lg">
              Welcome back, <span>Stanley</span>
            </h1>
            <p className="text-center text-sm">
              Today is <span>December 25 2025</span>!
            </p>
          </div>
          <div className="flex flex-wrap">
            {/* LEFT */}
            <div className="w-4/6">
              <div className="stats & log md:flex justify-evenly md:gap-2 space-y-4">
                <div className=" bg-[#608BC1] rounded-lg p-5 space-y-3">
                  <h3 className="text-[15px] font-bold text-white ">
                    Manage your mental health in one touch
                  </h3>
                  <p className="text-[10px] text-white ">
                    What's your mood today?
                  </p>
                  <button className=" text-black font-semibold rounded-md text-sm p-2 bg-white">
                    Log Mood
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-2 justify-evenly ">
                  <div className="grid bg-white rounded-lg p-3  ">
                    <h3 className="text-[15px] font-bold text-center">
                      Current sentiment
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="font-bold text-[20px]">0.8</span>
                      <span className="relative">
                        <BiSolidUpArrow className="text-[#207613]" />
                        <p className="text-[10px] text-[#207613] absolute top-3">
                          +0.3%
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="grid bg-white rounded-lg p-3">
                    <h3 className="text-[15px] font-bold text-center">
                      Most Frequent Mood
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="text-[15px] font-bold">Happy</span>
                      <span className="">
                        <p className="text-[20px] text-[#207613]">🙂</p>
                      </span>
                    </div>
                  </div>
                  <div className="grid bg-white rounded-lg p-3">
                    <div className="flex justify-evenly items-center">
                      <div>
                        <span className="font-bold">289</span>
                      </div>
                      <div>
                        <FaArrowTrendUp />
                      </div>
                    </div>
                    <p className="text-sm">Total entries</p>
                    <span className="text-sm">-2% than last month</span>
                  </div>
                  <div className="grid bg-white rounded-lg p-3 ">
                    <h3 className="text-[15px] font-bold text-center">
                      Stress Levels
                    </h3>
                    <div className="progress-bar bg-gray-500 h-[20px] rounded-lg">
                      <div
                        className="bg-red-600 h-full rounded-lg"
                        style={{ width: "80%" }}
                      ></div>
                      <div className="flex justify-between text-[10px]">
                        <p>Low</p>
                        <p>Medium</p>
                        <p>High</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="charts">
                <h2 className="text-center text-lg font-bold">Mood Trends</h2>
                <div className="toggleButton"></div>
                <div className="grid gap-2 md:flex md:flex-wrap w-full ">
                  <div className="line-chart md:w-[48%] h-[450px]">
                    <SentimentChart />
                  </div>
                  <div className="bar-chart md:w-[48%] h-[450px] ">
                    <StressLevels />
                  </div>
                  <div className="pie-chart md:w-[48%] h-[450px]">
                    <SentimentCategories />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="calendar & recent activity w-2/6">
              <div className="sentiment-calendar"> r</div>
              <div className="recent-activity"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
