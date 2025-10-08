import { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import Topbar from "../../Components/Topbar/Topbar";
import SentimentChart from "../../Components/Charts/LineChart";
import StressLevels from "../../Components/Charts/BarChart";
import SentimentCategories from "../../Components/Charts/PieChart";
import Cards from "../../Components/Tiltcards/TiltCard";
import { toast } from "react-toastify";
import { trackFeatureUsage } from "../../../utils/FeatureInteraction.js";
import { auth } from "../../Components/Firebase/firebase.js";
import { useSentiment } from "../../context/SentimentContext.jsx";

const Journal = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const [text, setText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);

  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { sentiment, setSentiment,journalText, setJournalText } = useSentiment();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    trackFeatureUsage("Mood Tracking");
  }, []);

  
  const saveJournalEntry = async (text, sentiment, sentimentScore, level) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found.");
        toast.error("User not authenticated.");
        return;
      }

      if (!text || sentimentScore === undefined || !user.uid) {
        console.error("Missing required fields:", {
          text,
          sentimentScore,
          firebaseUid: user?.uid,
        });
        toast.error("Text, sentimentScore, and firebaseUid are required.");
        return;
      }

      // Get Firebase Authentication Token
      const token = await user.getIdToken();

      const entryData = {
        text,
        sentiment,
        sentimentScore,
        level,
        userId: user.uid,
      };

      console.log("Sending Journal Entry Data:", entryData);

      const response = await fetch(`${API_BASE_URL}/api/journal/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entryData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        toast.error(
          data.error || "Failed to save journal entry. Please try again."
        );
        return;
      }

      toast.success("Journal entry saved successfully");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast.error("Failed to save journal entry. Please try again.");
    }
  };

 

  const analyzeSentiment = async (e) => {
    
    e.preventDefault();
    if (!text.trim())
      return toast.info("Please enter some text to analyze sentiment");
    toast.info("Analyzing sentiment...");

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const userToken = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to analyze sentiment. Please try again.");
        return;
      }

      console.log("Received Sentiment Data:", data);
      setSentimentResult(data);

      // Ensure compound is defined; use 0 as a fallback if not.
      const sentimentScore = data.compound !== undefined ? data.compound : 0;
      const sentimentLabel =
        sentimentScore > 0.2
          ? "Positive"
          : sentimentScore < -0.2
          ? "Negative"
          : "Neutral";

          setSentiment({
            mood: sentimentLabel,
            score: sentimentScore,
          });
          setSentiment({
            mood: sentimentLabel,
            score: sentimentScore,
          });
          setJournalText(text);
          console.log("Updated sentiment:", { mood: sentimentLabel, score: sentimentScore });
          

      // Call saveJournalEntry with the correct number of arguments
      await saveJournalEntry(text, sentimentLabel, sentimentScore, 1);
    } catch (error) {
      console.error("Error analyzing sentiment", error);
      toast.error("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        console.log("User ID:", auth.currentUser?.uid);

        const response = await fetch(`${API_BASE_URL}/api/journal`, {
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
        // setError("Failed to fetch journal entries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, []);

  // if (error) return <p>Error : {error}</p>

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return <SentimentChart journalEntries={journalEntries} />;
      case "bar":
        return <StressLevels />;
      case "pie":
        return <SentimentCategories />;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-[#D9D9D9]  ">
      <Sidebar />
      <div className="p-4 text-2xl  flex-1 w-full ">
        {/* <div>
          <Topbar />
        </div> */}
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
              <form
                action=""
                method="post"
                className="flex flex-col gap-3"
                onSubmit={analyzeSentiment}
              >
                <textarea
                  className="bg-gray-700 text-white w-full rounded-lg text-[12px] min-h-[30vh] p-2 resize-none "
                  placeholder="Write a note...(e.g, I'm feeling stressed about work today)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="grid justify-end items-center ">
                  <button
                    type="submit"
                    className="bg-[#77DD77] text-[15px] p-2 rounded-lg font-bold hover:bg-[#608BC1] hover:text-white "
                  >
                    Analyze
                  </button>
                </div>
              </form>
            </div>
          </div>

          {sentimentResult &&
            (loading ? (
              <div className="flex justify-center items-center p-4">
                <div className="spinner">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h3 className="text-center text-[15px] font-bold">
                    Feedback
                  </h3>
                </div>
                <div className="bg-white p-2 rounded-lg ">
                  <div
                    className={`${
                      sentimentResult.compound > 0
                        ? "bg-[#1BA739]"
                        : sentimentResult.compound < 0
                        ? "bg-[#B20E0E]"
                        : "bg-[#A76A1B]"
                    } flex flex-row justify-evenly items-center  rounded-lg p-3 w-full `}
                  >
                    <div className="text-[30px]">
                      {sentimentResult.compound > 0
                        ? "🙂"
                        : sentimentResult.compound < 0
                        ? "😔"
                        : "😐"}
                    </div>
                    <div>
                      <div className="font-bold text-[20px] text-center">
                        {sentimentResult.compound > 0
                          ? "Positive"
                          : sentimentResult.compound < 0
                          ? "Negative"
                          : "Neutral"}
                      </div>
                      <div className="text-center text-[15px]">
                        {sentimentResult.compound > 0
                          ? "Keep up the great work!"
                          : sentimentResult.compound < 0
                          ? "Remember, it's okay to feel this way. Take a break."
                          : "Let's see how later feels!"}
                      </div>
                    </div>
                    <div className="font-bold">{sentimentResult.compound}</div>
                  </div>
                </div>
              </div>
            ))}

          <div>
            <h3 className="text-center text-[15px] font-bold">
              Sentiment Analytics
            </h3>
          </div>
          <div>
            <div className="flex flex-col gap-3 items-center ">
              <div className="flex flex-row gap-1">
                <p className="text-[15px]">Choose chart type : </p>
                <select
                  name=""
                  value={selectedChart}
                  onChange={(e) => setSelectedChart(e.target.value)}
                  id=""
                  className="rounded-lg text-[15px] p-2 font-light"
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              <div className="md:w-[90%] w-full">{renderChart()}</div>
            </div>
          </div>
          <div>
            <h3 className="text-center text-[15px] font-bold">
              Sentiment History
            </h3>
          </div>
        </div>
        <div>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Journal;
