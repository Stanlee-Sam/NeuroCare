import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="Hero-section">
      <div className="bg-img rounded-b-lg">
      </div>
      <div className="glass">
        <div className="hero-top" >
          <div className="logo">
            <img src="../../../../src/assets/Logo-hero.png" alt="" />
          </div>
          <div className="buttons">
            <button className="bg-[#77DD77] text-black-600 p-3 rounded-lg text-[10px] md:text-[15px] font-bold hover:bg-gray-100 transition">
              <Link to="/signup">Sign up</Link>
            </button>
            <button className="log-in-btn bg-[#608BC1] text-black-600 p-3 text-[10px] md:text-[15px] rounded-lg font-bold hover:bg-gray-100 transition">Log in</button>
          </div>
        </div>
        <div>
          <div className = "banner ">
            <img className = " " src="../../../../src/assets/logo-hero-main.png" alt="" />
            <h1 className="absolute left-[22%] md:left-[36%]">Track and Support Your Well-being</h1>
            <button className="bg-[#77DD77] text-black-600 p-3 rounded-lg text-[10px] md:text-[15px] font-bold hover:bg-gray-100 transition absolute bottom-[26%] left-[46%] text-md ">
            <Link to="/login">Get Started</Link>

            </button>
          </div>
          <div>
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
