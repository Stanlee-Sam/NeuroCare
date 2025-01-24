import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const Cards = () => {
  return (
    <div className="grid w-full place-content-center bg-[#D9D9D9]  px-4 py-12 text-slate-900">
      <TiltCard />
    </div>
  );
};

const TiltCard = () => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const sentiments = [
    {
      id: 1,
      emoji: "🙂",
      type: "Positive",
      date: "24th Nov 2024",
      time: "10:30 AM",
      sentiment: "You seem to be feeling positive today!",
      desc: "Keep up the great work",
      score: 8 / 10,
    },
    {
      id: 2,
      emoji: "😐",
      type: "Neutral",
      date: "23th Nov 2024",
      time: "12:30 PM",
      sentiment: "Your feeling neutral today!",
      desc: "Let's see how tomorrow feels",
      score: 5 / 10,
    },
    {
      id: 3,
      emoji: "😔",
      type: "Negative",
      date: "22nd Nov 2024",
      time: "9:30 AM",
      sentiment: "It looks like you're feeling down.Take care!",
      desc: "Remember, it's ok to feel this way.Take a break",
      score: 2 / 10,
    },
  ];

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
      {sentiments.map((sentiment) => {
        const ref = useRef(null);
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const xSpring = useSpring(x);
        const ySpring = useSpring(y);
        const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

        return (
          <div key={sentiment.id} className="flex flex-row justify-center">
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
    className="absolute inset-4 flex flex-col justify-center items-center rounded-xl bg-[#608BC1] shadow-lg"
  >
    <div key={sentiment.id} className="flex flex-col place-items-center text-white  hover:text-black cursor-pointer">
      <div>{sentiment.emoji}</div>
      <div className="font-bold">{sentiment.type}</div>
      <div className="text-[20px]">{sentiment.score}</div>
      <div className="text-[15px]">
        {sentiment.date},{sentiment.time}
      </div>
      <div className="text-[10px]">{sentiment.desc}</div>
    </div>
  </div>
</motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;