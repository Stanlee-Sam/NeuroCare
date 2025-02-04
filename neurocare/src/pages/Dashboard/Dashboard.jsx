import { useSpring, animated } from "@react-spring/web";
import Activity from "../../Components/Activity/Activity";
import JournalCalendar from "../../Components/Calendar/Calendar";
import StressLevels from "../../Components/Charts/BarChart";
import SentimentChart from "../../Components/Charts/LineChart";
import SentimentCategories from "../../Components/Charts/PieChart";
import FeatureInteraction from "../../Components/Charts/RadialChart"; // Fixed typo here
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { BiSolidUpArrow } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";


import PropTypes from 'prop-types';

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 1000,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

const Dashboard = () => {

  const [journalEntries, setJournalEntries] = useState([]);
  // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
      const fetchJournalEntries = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/journal");
          if(!response.ok){
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Journal Entries:", data);
  
           const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setJournalEntries(sortedData);
      } catch (error) {
        console.error("Error fetching journal entries", error);
        setError("Failed to fetch journal entries. Please try again.");
      } finally {
        // setLoading(false);
      }
    };
  
      fetchJournalEntries();
    }, []);

    if (error) return <p>Error : {error}</p>
  
  return (
    <div className="flex bg-[#D9D9D9]">
      <Sidebar />
      <div className="p-4 text-2xl flex-1 max-w-full ">
        {/* Top-bar */}
        <div className="">
          <Topbar />
        </div>
        <div className="space-y-4 pl-10 md:pl-14 pb-10 md:pb-5 max-w-full">
          {/* <div className="welcome">
            <h1 className="text-center font-bold my-2 text-lg">
              Welcome back, <span>Stanley</span>
            </h1>
            <p className="text-center text-sm">
              Today is <span>December 25 2025</span>!
            </p>
          </div> */}
          <div className="grid gap-2 md:flex max-w-full">
            {/* LEFT */}
            <div className="md:w-4/6 max-w-full flex flex-col gap-4">
              <div className="stats & log flex flex-col md:flex-row max-w-full gap-2 ">
                <div className="md:w-[55%] bg-[#608BC1] rounded-lg p-5 space-y-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl flex flex-col md:items-center">
                  <h3 className="text-[15px] font-bold text-white md:text-center">
                    Manage your mental health in one touch
                  </h3>
                  <p className="text-[10px] text-white ">
                    What&apos;s your mood today?
                  </p>
                  <button className="text-black font-semibold rounded-md text-sm p-2 bg-[#77DD77] hover:bg-[#77DD77] hover:text-white ">
                    Log Mood
                  </button>
                </div>
                <div className="md:w-[45%] w-full flex flex-col gap-2 md:grid md:grid-cols-2 ">
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
                    <h3 className="text-[15px] font-light text-center">
                      Current sentiment
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="font-bold text-[20px]"><Number n={0.8} />

                      </span>
                      <span className="relative">
                        <BiSolidUpArrow className="text-[#207613] animate-bounce" />
                        <p className="text-[10px] text-[#207613] absolute top-3">
                          +0.3%
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl  ">
                    <h3 className="text-[15px] font-light text-center">
                      Most Frequent Mood
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="text-[15px] font-bold">Happy</span>
                      <span className="">
                        <p className="text-[20px] text-[#207613] ">🙂</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl ">
                    <div className="flex justify-evenly items-center">
                      <div>
                        <span className="font-bold">
                          <Number n={289} />
                        </span>
                      </div>
                      <div>
                        <FaArrowTrendUp className="animate-pulse" />
                      </div>
                    </div>
                    <p className="text-sm text-center">Total entries</p>
                    <span className="text-sm text-center">
                      -2% than last month
                    </span>
                  </div>
                  <div className="flex flex-col bg-white rounded-lg p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl ">
                    <h3 className="text-[15px] font-light text-center">
                      Stress Levels
                    </h3>
                    <div className="progress-bar bg-gray-500 h-[15px] rounded-lg">
                      <div className="bg-red-600 h-full rounded-lg hover:animate-pulse w-[80%] "></div>
                    </div>
                    <div className="flex justify-between text-[10px] ">
                      <p>Low</p>
                      <p>Medium</p>
                      <p>High</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="charts flex flex-col gap-2">
                <h2 className="text-center text-lg font-bold">Mood Trends</h2>
                <div className="toggleButton"></div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-2 w-full ">
                  <div className="line-chart ">
                    <SentimentChart journalEntries = {journalEntries}/>
                  </div>
                  <div className="bar-chart">
                    <StressLevels />
                  </div>
                  <div className="pie-chart ">
                    <SentimentCategories />
                  </div>
                  <div className="">
                    <FeatureInteraction />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="calendar & recent activity w-full md:w-2/6 bg-white rounded-lg p-5 shadow-2xl flex flex-col items-center">
              <div className="sentiment-calendar w-full flex flex-col items-center">
                <JournalCalendar />
              </div>
              <div className="recent-activity w-full">
                <Activity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Number.propTypes = {
  n: PropTypes.number.isRequired,
};



export default Dashboard;