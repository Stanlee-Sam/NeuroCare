import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
const Login = () => {
  return (
    <section className=" md:grid place-items-center md:bg-[#D9D9D9] md:h-[100vh] h-full">
      <div className=" place-self-center md:flex bg-white md:w-[50%] w-[100%] ">
        <div className="md:w-3/5">
          <div>
            <img
              className="md:w-20 w-2 invisible md:visible"
              src="../../../src/assets/Logo-hero.png"
              alt=""
            />
          </div>
          <div className="grid justify-center ">
            <h1 className="text-center text-3xl text-[#608BC1] font-bold">
              Login to Account
            </h1>

            <div className="border-2 place-self-center my-5 border-[#608BC1] inline-block mb-2 w-10"></div>

            <div className="flex justify-center gap-x-4 my-2">
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] "
              >
                <FaGoogle className="w-6 h-6 text-black" />
              </a>
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] "
              >
                <FaFacebookF className="w-6 h-6 text-black" />
              </a>
            </div>

            <div>
              <p className="font-light text-center py-3">
                Or use your email account
              </p>
            </div>

            <form className="grid justify-center gap-y-2">
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg ">
                <IoMail className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100 "
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg ">
                <IoIosLock className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100 "
                  type="password"
                  placeholder="Password"
                />
              </div>
            </form>
            <div className="flex justify-evenly w-64 my-5 ">
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
                className=" border-2 border-[#608BC1] inline-block text-black hover:bg-[#608BC1] rounded-full px-12 py-2 font-semibold mb-2 hover:text-white w-full max-[750px]:mb-10"
              >
                Login
              </button>
              <div className="text-center text-sm text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-[#608BC1] md:rounded-l-xl max-[770px]:rounded-t-full  md:w-2/5 grid place-items-center ">
          <div className="place-items-center">
            <h1 className="text-3xl text-white mb-2 font-bold">
              Hello, Friend!
            </h1>
            <div className="border-2 place-self-center my-5 border-white inline-block mb-2 w-10"></div>

            <p className="text-center px-2 mb-3 text-white">
              Enter your personal details and start your journey with us
            </p>
            <button className=" border-2 border-white inline-block text-white hover:bg-white rounded-full px-12 py-2 font-semibold mt-5 hover:text-[#608BC1] w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
