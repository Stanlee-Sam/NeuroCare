import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../Components/Firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { toast } from "react-toastify";
import * as Yup from "yup";
import Logo from "../../../src/assets/Logo-hero.png";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) =>
        toast.error(error.message, { position: "top-center" })
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      toast.success("User logged in successfully!", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid email or password. Please try again.", {
        position: "bottom-center",
      });
    }
  };
  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result?.additionalUserInfo?.isNewUser || false;

      console.log("Google user:", user);
      console.log("Is new user:", isNewUser);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (isNewUser || !userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });

        toast.success("Welcome! Your account has been created.", {
          position: "top-center",
        });
      } else {
        toast.success("Welcome back! Login successful", {
          position: "top-center",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Google sign-in failed", { position: "bottom-center" });
    }
  };

  const facebookLogIn = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result?.additionalUserInfo?.isNewUser || false;

      console.log("Facebook user:", user);
      console.log("Is new user:", isNewUser);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (isNewUser || !userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });

        toast.success("Welcome! Your account has been created.", {
          position: "top-center",
        });
      } else {
        toast.success("Welcome back! Login successful", {
          position: "top-center",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      toast.error("Facebook sign-in failed", { position: "bottom-center" });
    }
  };

  return (
    <section className="grid place-items-center bg-[#D9D9D9] h-screen">
      <div className="md:flex bg-white md:w-[50%] w-full grid  h-full md:h-auto lg:h-[75] place-self-center">
        {/* Login Form Section */}
        <div className=" place-self-center md:w-3/5 md:pb-10 ">
          <div className="">
            <img
              className="md:w-20 w-2 invisible md:visible"
              src={Logo}
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
                onClick={googleLogIn}
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] hover:border-[#608BC1]"
              >
                <FaGoogle className="w-6 h-6 text-black hover:text-[#608BC1]" />
              </a>
              <a
                onClick={facebookLogIn}
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

            <form
              onSubmit={handleSubmit}
              className="grid justify-center gap-y-2"
            >
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg">
                <IoMail className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg">
                <IoIosLock className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
            </form>
          </div>
        </div>

        {/* Blue Section */}
        <div className="bg-[#608BC1] md:rounded-l-xl max-[770px]:rounded-t-full md:w-2/5 grid place-items-center row-start md:row-start-auto">
          <div className="flex flex-col items-center gap-1">
            <h1 className=" text-[20px] min-[1140px]:text-2xl max-[770px]:mt-1 text-white md:mb-2 font-bold">
              Hello, Friend!
            </h1>
            <div className="border-2 place-self-center md:my-5 border-white inline-block mb-2 w-10"></div>

            <p className="text-center px-2 md:mb-3 text-white text-[12px] md:text-[20px]">
              Enter your personal details and start your journey with us
            </p>
            <button className="border-2 border-white rounded-full p-3 w-[250px]  text-white  hover:bg-white hover:text-[#608BC1] font-semibold">
              <Link to="/signup"> Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
