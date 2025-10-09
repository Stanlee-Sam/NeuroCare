import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import  FooterLogo  from "../../../../src/assets/logo-hero-main.png";
const Footer = () => {
  return (
    <section className="bg-black rounded-t-lg">
      <div className="grid">
        <img
          className="w-[150px] place-self-center   "
          src={FooterLogo}
          alt=""
        />
      </div>
      <div className="md:flex md:justify-evenly">
        <div className="text-white grid place-items-center items-center">
          <div>
            <p className="font-bold">Your Mental Health, Our Care.</p>
          </div>
          <div className="flex justify-evenly gap-5 md:gap-4 text-2xl p-4">
            <a href="#">
              <FiFacebook className="hover:text-[#77DD77]" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-[#77DD77]" />
            </a>
            <a href="#">
              <FaXTwitter className="hover:text-[#77DD77]" />
            </a>
            <a href="#">
              <FaGithubSquare className="hover:text-[#77DD77]" />
            </a>
          </div>
        </div>
        <div className="text-white md:flex md:justify-evenly grid place-items-left ml-10 gap-5 md:gap-20 ">
          <div>
            <h5 className="font-bold uppercase">Company</h5>
            <ul className="font-light cursor-pointer ">
              <li className="hover:text-[#77DD77]">About</li>
              <li className="hover:text-[#77DD77]">Contact Us</li>
              <li className="hover:text-[#77DD77]">Careers</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase">Features</h5>
            <ul className="font-light cursor-pointer">
              <li className="hover:text-[#77DD77]">Mood Tracking</li>
              <li className="hover:text-[#77DD77]">NeuroBot</li>
              <li className="hover:text-[#77DD77]">Resources</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase">Support</h5>
            <ul className="font-light cursor-pointer">
              <li className="hover:text-[#77DD77]">Privacy Policy</li>
              <li className="hover:text-[#77DD77]">Help Center</li>
              <li className="hover:text-[#77DD77]">Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="text-white text-center md:pt-20 p-5">
          © 2025 NeuroCare || Stanley Amunze. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
