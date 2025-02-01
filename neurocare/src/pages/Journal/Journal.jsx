import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import Topbar from "../../Components/Topbar/Topbar";
import SentimentChart from "../../Components/Charts/LineChart";
import StressLevels from "../../Components/Charts/BarChart";
import SentimentCategories from "../../Components/Charts/PieChart";
import Cards from "../../Components/Tiltcards/TiltCard";
import { toast } from "react-toastify";

const Journal = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const [text, setText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const saveJournalEntry = async (text, sentiment, sentimentScore, userId) => {
    try {
      const requestBody = { text, sentiment, sentimentScore, userId };
    console.log("Saving Journal Entry:", requestBody);

    const response = await fetch("http://localhost:5000/api/journal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log("Response from server",data)
      if(response.ok){
        toast.success("Journal entry saved successfully");
      }else {
        toast.error(data.error || "Failed to save journal entry. Please try again.");
      }

    } catch (error) {
      console.error("Error saving journal entry", error);
      toast.error("Failed to save journal entry. Please try again.");
    }
  }

  const analyzeSentiment = async (e) => {
    e.preventDefault();
    if (!text.trim())
      return toast.info("Please enter some text to analyze sentiment");
    toast.info("Analyzing sentiment...");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if(response.ok){
        
        toast.error("Failed to analyze sentiment. Please try again.");

      } 
      const data = await response.json();
      setSentimentResult(data);

      const sentimentLabel = data.compound > 0 ? "Positive" : data.compound < 0 ? "Negative" : "Neutral";
        await saveJournalEntry(text, sentimentLabel, data.compound, 1);


    } catch (error) {
      console.error("Error analyzing sentiment", error);
      toast.error("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return <SentimentChart />;
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
                <div
                  className="spinner"
    
                >
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
                          : "Let's see how tomorrow feels!"}
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
