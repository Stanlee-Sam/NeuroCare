import "./Hero.css";
import { Link } from "react-router-dom";
import logoHero  from "../../../../src/assets/Logo-hero.png";
import MainLogo from "../../../../src/assets/logo-hero-main.png"

const Hero = () => {
  return (
    <div className="Hero-section">
      <div className="bg-img rounded-b-lg"></div>
      <div className="glass">
        <div className="hero-top">
          <div className="logo">
            <img src={logoHero} alt="" />
          </div>
          {/* <div className="buttons">
            <button className="bg-[#77DD77] text-black-600 p-3 rounded-lg text-[10px] md:text-[15px] font-bold hover:bg-gray-100 transition cursor-pointer">
              <Link to="/signup">Sign up</Link>
            </button>
            <button className="log-in-btn bg-[#608BC1] text-black-600 p-3 text-[10px] md:text-[15px] rounded-lg font-bold hover:bg-gray-100 transition">
              Log in
            </button>
          </div> */}
        </div>
        <div className="flex flex-col items-center">
          <div 
          className="flex flex-col items-center relative"
          >
            <img
              className="w-[300px] md:w-[380px] "
              src={MainLogo}
              alt=""
            />
            <h1 className=" text-white font-bold text-[15px] absolute top-[60%]">
              Track and Support Your Well-being
            </h1>
            <button 
            className="bg-[#77DD77] text-black-600 p-3 rounded-lg text-[10px] md:text-[15px] font-bold hover:bg-gray-100 transition  text-md absolute top-[75%] "
            >
              <Link to="/login">Get Started</Link>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <span className="mouse">
              <span className="mouse-wheel"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
