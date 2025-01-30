import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import axios from "axios";

const Cards = () => {

  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/journal");
        setJournalEntries(response.data);
      }
      catch(error){
        console.error("Error fetching journal entries:", error);
      }
    }

    fetchJournalEntries();
  }, []);


  return (
    <div className="grid w-full place-content-center bg-[#D9D9D9]  px-4 py-12 text-slate-900">
      <TiltCard journalEntries = {journalEntries} />
    </div>
  );
};

const TiltCard = ({ journalEntries }) => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  // const sentiments = [
  //   {
  //     id: 1,
  //     emoji: "🙂",
  //     type: "Positive",
  //     date: "24th Nov 2024",
  //     time: "10:30 AM",
  //     sentiment: "You seem to be feeling positive today!",
  //     desc: "Keep up the great work",
  //     score: 8 / 10,
  //   },
  //   {
  //     id: 2,
  //     emoji: "😐",
  //     type: "Neutral",
  //     date: "23th Nov 2024",
  //     time: "12:30 PM",
  //     sentiment: "Your feeling neutral today!",
  //     desc: "Let's see how tomorrow feels",
  //     score: 5 / 10,
  //   },
  //   {
  //     id: 3,
  //     emoji: "😔",
  //     type: "Negative",
  //     date: "22nd Nov 2024",
  //     time: "9:30 AM",
  //     sentiment: "It looks like you're feeling down.Take care!",
  //     desc: "Remember, it's ok to feel this way.Take a break",
  //     score: 2 / 10,
  //   },
  // ];

  const handleMouseMove = (e, x, y, ref) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = (x, y) => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      {journalEntries.map((entry) => {
        const ref = useRef(null);
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const xSpring = useSpring(x);
        const ySpring = useSpring(y);
        const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

        const backgroundColor =
          entry.sentimentScore > 0
            ? "bg-[#1BA739]" 
            : entry.sentimentScore < 0
            ? "bg-[#B20E0E]" 
            : "bg-[#A76A1B]"; 

        return (
          <div key={entry.id} className="flex flex-row justify-center">
            <motion.div
              ref={ref}
              onMouseMove={(e) => handleMouseMove(e, x, y, ref)}
              onMouseLeave={() => handleMouseLeave(x, y)}
              style={{
                transformStyle: "preserve-3d",
                transform,
              }}
              className="relative flex h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
            >
              <div
                style={{
                  transform: "translateZ(75px)",
                  transformStyle: "preserve-3d",
                }}
                className={`${backgroundColor} absolute inset-4 flex flex-col justify-center items-center rounded-xl shadow-lg`}
              >
                <div className="flex flex-col place-items-center text-white hover:text-black cursor-pointer">
                  <div>
                    {entry.sentiment === "Positive"
                      ? "🙂"
                      : entry.sentiment === "Neutral"
                      ? "😐"
                      : "😔"}
                  </div>
                  <div className="font-bold">{entry.sentiment}</div>
                  <div className="text-[20px]">{entry.sentimentScore}</div>
                  <div className="text-[15px]">
                    {new Date(entry.createdAt).toLocaleString()}
                  </div>
                  <div className="text-[10px]">{entry.text}</div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
TiltCard.propTypes = {
  journalEntries: PropTypes.array.isRequired,
};

export default Cards;
