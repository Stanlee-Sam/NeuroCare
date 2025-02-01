import { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ReactCardFlip from "react-card-flip";

const TiltCardItem = ({ entry }) => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    console.log("flipCard triggered, new state:", !isFlipped);
    setIsFlipped((prev) => !prev);
  };
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const backgroundColor =
    entry.sentimentScore > 0
      ? "bg-[#1BA739]"
      : entry.sentimentScore < 0
      ? "bg-[#B20E0E]"
      : "bg-[#A76A1B]";

  return (
    <div className="flex flex-row justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={(e) => handleMouseMove(e, x, y, cardRef)}
        onMouseLeave={() => handleMouseLeave(x, y)}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="relative flex h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
      >
        <div
          className={`${backgroundColor} absolute inset-4 flex flex-col justify-center items-center rounded-xl shadow-lg`}
        >
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            {/* Front of the card */}
            <div
              key="front"
              onClick={flipCard}
              style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
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
                <div className="text-[10px]">
                  <button className="rounded-full p-2 border-2 cursor-pointer animate-pulse hover:bg-[#608BC1]">
                    More details
                  </button>
                </div>
              </div>
            </div>

            {/* Back of the card */}
            <div
              key="back"
              onClick={flipCard}
              style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div className=" flex flex-col justify-center items-center rounded-xl shadow-lg w-full h-full ">
                <div className="text-sm text-center text-white p-4">
                  {entry.text}
                </div>
              </div>
            </div>
          </ReactCardFlip>
        </div>
      </motion.div>
    </div>
  );
};

TiltCardItem.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default TiltCardItem;
