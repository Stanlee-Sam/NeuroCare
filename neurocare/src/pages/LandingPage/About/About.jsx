import { Link } from "react-router-dom";
import AboutUs from "../../../../src/assets/laptop.jpeg"
const About = () => {
  return (
    <section className="pt-10 pb-20">
      <h1 className="text-center align-text-top font-bold text-[20px]">
        {" "}
        About Us
      </h1>

      <div className="md:flex justify-between gap-5 items-center p-5 h-[100%]">
        <div className="md:w-[50%] pl-10">
          <img
            className="rounded-md w-[500px] "
            src={AboutUs}
            alt=""
          />
        </div>
        <div className="md:w-[50%] md:pr-10 grid justify-center place-items-center pt-10">
          <p className="pb-10 text-sm md:text-lg text-center">
            NeuroCare is a mental health companion designed to help you track
            your emotions, understand your mood patterns, and support your
            journey with personalized AI guidance
          </p>
          <button className="bg-[#77DD77] text-black-600 p-3 rounded-lg text-[10px] md:text-[15px] font-bold hover:bg-gray-100 transition text-md self-center w-[200px] ">
          <Link to="/login">Get Started</Link>

            </button>
          </div>
      </div>
    </section>
  );
};

export default About;
