import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";

const Login = () => {
  return (
    <section className="grid place-items-center bg-[#D9D9D9] h-screen">
      <div className="md:flex bg-white md:w-[50%] w-full grid  h-full md:h-auto lg:h-[75] place-self-center">
        {/* Login Form Section */}
        <div className=" place-self-center md:w-3/5 md:pb-10 ">
          <div className="">
            <img
              className="md:w-20 w-2 invisible md:visible"
              src="../../../src/assets/Logo-hero.png"
              alt=""
            />
          </div>
          <div className="grid place-self-center">
            <h1 className="text-center text-3xl text-[#608BC1] font-bold">
              Login to Account
            </h1>

            <div className="border-2 place-self-center my-5 border-[#608BC1] inline-block mb-2 w-10"></div>

            <div className="flex justify-center gap-x-4 my-2">
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] hover:border-[#608BC1]"
              >
                <FaGoogle className="w-6 h-6 text-black hover:text-[#608BC1]" />
              </a>
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] hover:border-[#608BC1]"
              >
                <FaFacebookF className="w-6 h-6 text-black hover:text-[#608BC1]" />
              </a>
            </div>

            <div>
              <p className="font-light text-center py-3">
                Or use your email account
              </p>
            </div>

            <form className="grid justify-center gap-y-2">
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg">
                <IoMail className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg">
                <IoIosLock className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </form>
            <div className="flex justify-evenly w-64 md:my-5 my-3">
              <label
                htmlFor="remember"
                className="text-xs flex items-center gap-1"
              >
                <input className="" type="checkbox" /> Remember Me
              </label>
              <a href="#" className="text-xs text-blue-600">
                Forgot Password?
              </a>
            </div>
            <div className="place-self-center">
              <button
                type="submit"
                className="border-2 border-[#608BC1] inline-block text-black hover:bg-[#608BC1] rounded-full px-12 py-2 font-semibold md:mb-2 hover:text-white w-full max-[750px]:mb-10"
              >
                Login
              </button>
              <div className="text-center text-sm text-gray-600" />
            </div>
          </div>
        </div>

        {/* Blue Section */}
        <div className="bg-[#608BC1] md:rounded-l-xl max-[770px]:rounded-t-full md:w-2/5 grid place-items-center row-start md:row-start-auto">
          <div className="place-items-center">
          <h1 className=" text-[20px] min-[1140px]:text-2xl max-[770px]:mt-5 text-white md:mb-2 font-bold">
          Hello, Friend!
            </h1>
            <div className="border-2 place-self-center md:my-5 border-white inline-block mb-2 w-10"></div>

            <p className="text-center px-2 md:mb-3 text-white text-[12px] md:text-[20px]">
              Enter your personal details and start your journey with us
            </p>
            <button className="border-2 border-white inline-block text-white hover:bg-white rounded-full px-12 py-2 font-semibold mt-3 md:mt-5 hover:text-[#608BC1] w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
