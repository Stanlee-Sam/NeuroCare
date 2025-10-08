import { useSpring, animated } from "@react-spring/web";
import Activity from "../../Components/Activity/Activity";
import JournalCalendar from "../../Components/Calendar/Calendar";
import StressLevels from "../../Components/Charts/BarChart";
import SentimentChart from "../../Components/Charts/LineChart";
import SentimentCategories from "../../Components/Charts/PieChart";
import FeatureInteraction from "../../Components/Charts/RadialChart"; // Fixed typo here
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import StressProgressBar from "../../Components/ProgressBar/StressProgressBar";
import { trackFeatureUsage } from "../../../utils/FeatureInteraction.js";
import { Link } from "react-router-dom";
import { auth } from "../../Components/Firebase/firebase";

import PropTypes from "prop-types";
import { FaClipboardList } from "react-icons/fa";
// import axios from "axios";

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
  const [averageStress, setAverageStress] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSentiment, setCurrentSentiment] = useState(0);
  const [sentimentChange, setSentimentChange] = useState(0);
  const [mostFrequentMood, setMostFrequentMood] = useState("N/A");
  const [totalEntries, setTotalEntries] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    trackFeatureUsage("Dashboard");
  }, []);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const token = await auth.currentUser.getIdToken();


        const response = await fetch(`{${API_BASE_URL}/api/journal`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Journal Entries:", data);

        const sortedData = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
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
  useEffect(() => {
    // Function to calculate average stress level for today
    const calculateAverageStress = (entries) => {
      if (entries.length === 0) return 0;
      const totalStress = entries.reduce((sum, entry) => sum + entry.level, 0);
      return Math.round(totalStress / entries.length);
    };

    // Filter entries for today
    const todayEntries = journalEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt).toDateString();
      return entryDate === new Date().toDateString();
    });

    setAverageStress(calculateAverageStress(todayEntries));
  }, [journalEntries]);

  useEffect(() => {
    const calculateAverageSentiment = (entries) => {
      if (entries.length === 0) return 0;
      const totalSentiment = entries.reduce(
        (sum, entry) => sum + entry.sentimentScore,
        0
      );
      return (totalSentiment / entries.length).toFixed(1); // Keep two decimal places
    };

    const todayEntries = journalEntries.filter((entry) => {
      return (
        new Date(entry.createdAt).toDateString() === new Date().toDateString()
      );
    });

    const yesterdayEntries = journalEntries.filter((entry) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return (
        new Date(entry.createdAt).toDateString() === yesterday.toDateString()
      );
    });

    const todaySentiment = parseFloat(calculateAverageSentiment(todayEntries));
    const yesterdaySentiment = parseFloat(
      calculateAverageSentiment(yesterdayEntries)
    );

    const sentimentChange = yesterdaySentiment
      ? ((todaySentiment - yesterdaySentiment) / yesterdaySentiment) * 100
      : 0; // Avoid division by zero

    setCurrentSentiment(todaySentiment);
    setSentimentChange(sentimentChange.toFixed(1)); // Keep two decimal places
    console.log("Previous Sentiment:", yesterdaySentiment);
    console.log("Current Sentiment:", currentSentiment);
    console.log("Calculated Sentiment Change:", sentimentChange);
      }, [journalEntries]);

  useEffect(() => {
    const findMostFrequentMood = (entries) => {
      if (entries.length === 0) return "N/A";

      const moodCount = entries.reduce((acc, entry) => {
        acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
        return acc;
      }, {});

      return Object.keys(moodCount).reduce((a, b) =>
        moodCount[a] > moodCount[b] ? a : b
      );
    };

    setMostFrequentMood(findMostFrequentMood(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    setTotalEntries(journalEntries.length);
  }, [journalEntries]);

  if (error) return <p>Error : {error}</p>;

  return (
    <div className="flex bg-[#D9D9D9]">
      <Sidebar />
      <div className="p-4 text-2xl flex-1 max-w-full ">
        {/* Top-bar */}
        <div className="">
          <Topbar />
        </div>
        <div className="space-y-4 pl-10 md:pl-14 pb-10 md:pb-5 max-w-full">
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
                    <Link to="/journal"> Log Mood</Link>
                  </button>
                </div>
                <div className="md:w-[45%] w-full flex flex-col gap-2 md:grid md:grid-cols-2 ">
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl">
                    <h3 className="text-[15px] font-light text-center">
                      Current sentiment
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="font-bold text-[20px]">
                        {currentSentiment} 
                      </span>
                      <span className="relative">
                        {sentimentChange >= 0 ? (
                          <BiSolidUpArrow className="text-[#207613] animate-bounce" />
                        ) : (
                          <BiSolidDownArrow className="text-[#B22222] animate-bounce" />
                        )}
                        <p
                          className="text-[10px]  absolute top-3"
                          style={{
                            color: sentimentChange >= 0 ? "#207613" : "#B22222",
                          }}
                        >
                          {sentimentChange >= 0
                            ? `+${sentimentChange}%`
                            : `${sentimentChange}%`}
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl  ">
                    <h3 className="text-[15px] font-light text-center">
                      Most Frequent Mood
                    </h3>
                    <div className="flex justify-evenly items-center">
                      <span className="text-[15px] font-bold">
                        {mostFrequentMood}
                      </span>
                      <span className="">
                        {mostFrequentMood === "Positive" && (
                          <p className="text-[20px] text-[#207613] ">🙂</p>
                        )}
                        {mostFrequentMood === "Neutral" && (
                          <p className="text-[20px] text-[#A76A1B] ">😐</p>
                        )}
                        {mostFrequentMood === "Negative" && (
                          <p className="text-[20px] text-[#B20E0E] ">😞</p>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-evenly bg-white rounded-lg p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl ">
                    <div className="flex justify-evenly items-center">
                      <div>
                        <span className="font-bold">
                          <Number n={totalEntries} />
                        </span>
                      </div>
                      <div>
                        <FaClipboardList className="animate-pulse" />
                      </div>
                    </div>
                    <p className="text-sm text-center">Total entries</p>
                  </div>
                  <div className="flex flex-col bg-white rounded-lg p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl ">
                    <h3 className="text-[15px] font-light text-center">
                      Stress Levels
                    </h3>
                    <div className="progress-bar bg-gray-500 h-[15px] rounded-lg">
                      <div className=" h-full rounded-lg hover:animate-pulse w-full ">
                        <StressProgressBar stressPercentage={averageStress} />
                      </div>
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
                    <SentimentChart journalEntries={journalEntries} />
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
