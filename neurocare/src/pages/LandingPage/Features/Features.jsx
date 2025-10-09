import Mood from "../../../../src/assets/Mood.jpeg";
import Chatbot from "../../../../src/assets/Chatbot.jpeg"
import Book from "../../../../src/assets/Book.jpeg"

const Features = () => {
  return (
    <section className="bg-[#77DD77] rounded-t-lg pb-20">
      <div>
        <h2 className="text-center font-bold text-[20px] p-5">Features</h2>
      </div>
      <div className=" grid place-items-center md:flex justify-evenly items-center">
        <div className="static rounded-md bg-[#F5F5F5] grid justify-items-center items-center p-5 m-5 w-[65%]">
          <div>
            <img
              className="w-[100px] h-[100px] pt-2 rounded-lg"
              src={Mood}
              alt=""
            />
          </div>
          <div className="grid justify-items-center items-center">
            <h3 className="font-bold text-center pt-5">Track Your Mood</h3>
            <p className="text-center p-5">
              Log your mood and feelings to see patterns and better understand
              your emotional health.
            </p>
            <button className=" bg-[#608BC1] text-white rounded-md text-md p-2">
              Track Your Progress
            </button>
          </div>
        </div>
        <div className="static rounded-md bg-[#8F8F8F]  grid justify-items-center items-center p-5 m-5 w-[65%]">
          <div>
            <img
              className="w-[100px] h-[100px] pt-2 rounded-lg"
              src={Chatbot}
              alt=""
            />
          </div>
          <div className="grid justify-items-center items-center">
            <h3 className="font-bold text-center pt-5">Chat with NeuroBot</h3>
            <p className="text-center p-5">
              Get support from our AI chatbot that listens, understands, and
              offers helpful insights{" "}
            </p>
            <button className=" bg-[#080F17] text-white rounded-md text-md p-2">
              Try It Now
            </button>
          </div>
        </div>
        <div className="static rounded-md bg-[#F5F5F5] grid justify-items-center items-center p-5 m-5 w-[65%]">
          <div>
            <img
              className="w-[100px] h-[100px] pt-2 rounded-lg"
              src={Book}
              alt=""
            />
          </div>
          <div className="grid justify-items-center items-center">
            <h3 className="font-bold text-center pt-5">
              Personalized Resources
            </h3>
            <p className="text-center p-5">
              Access resources tailored to your needs, helping you improve your
              mental wellness journey.{" "}
            </p>
            <button className=" bg-[#608BC1] text-white rounded-md text-md p-2 ">
              Discover Resouces{" "}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
