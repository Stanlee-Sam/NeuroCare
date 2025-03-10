import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../Components/Firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =  useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "Users", user.uid), {
          name: name,
          email: user.email,
        })
      }


      console.log("User registered successfully!")
      toast.success("User registered successfully!", {
        position: "top-center",
      })
      navigate("/login")
      
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again.", {
        position: "bottom-center",
      })
      
    }
  }
    const googleSignIn = async () => {
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
      
              toast.success("Welcome! Your account has been created.", { position: "top-center" });
            } else {
              toast.success("Welcome back!", { position: "top-center" });
            }
      
            navigate("/login");
      
          } catch (error) {
            console.error("Error signing up with Google:", error);
            toast.error("Google sign-up failed", { position: "bottom-center" });
          }
      
    }
  



  return (
    <section className=" grid place-items-center bg-[#D9D9D9] md:h-screen  ">
      <div className=" place-self-center md:flex bg-white  md:w-[50%] w-[100%] ">
        <div className="bg-[#77DD77] md:rounded-r-xl max-[770px]:rounded-b-full md:w-2/5 grid place-items-center ">
          <div className="place-items-center">
            <h1 className=" text-[20px] min-[1140px]:text-2xl max-[770px]:mt-5 text-white md:mb-2 font-bold">
              Welcome back !
            </h1>
            <div className="border-2 place-self-center my-5 border-white inline-block mb-2 w-10"></div>

            <p className="text-center px-2 mb-3 text-white max-[700px]:text-[15px] max-[500px]:px-10">
              To keep connected with us please login with your personal info{" "}
            </p>
            <button className="max-[770px]:mb-5 border-2 border-white inline-block text-white hover:bg-white rounded-full px-12 py-2 font-semibold mt-5 hover:text-[#77DD77] w-full">
              <Link to = "/login">              Sign In
              </Link>
            </button>
          </div>
        </div>
        <div className="md:w-3/5 grid">
          <div className="md:place-self-end place-self-center invisible md:visible ">
            <img
              className="w-2 md:w-20 "
              src="../../../src/assets/Logo-hero.png"
              alt=""
            />
          </div>
          <div className="grid justify-center ">
            <h1 className="text-center text-3xl text-[#77DD77] font-bold">
              Create Account{" "}
            </h1>

            <div className="border-2 place-self-center my-5 border-[#77DD77] inline-block mb-2 w-10"></div>

            <div className="flex justify-center gap-x-4 my-2">
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] hover:border-[#77DD77] "
              >
                <FaGoogle onClick={googleSignIn} className="w-6 h-6 text-black hover:text-[#77DD77]" />
              </a>
              <a
                href="#"
                className="border-2 border-gray-200 mx-1 p-2 rounded-[50%] hover:border-[#77DD77]"
              >
                <FaFacebookF className="w-6 h-6 text-black hover:text-[#77DD77]" />
              </a>
            </div>

            <div>
              <p className="font-light text-center py-3">
                Or use your email account
              </p>
            </div>

            <form onSubmit={handleRegister} className="grid justify-center gap-y-2">
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg ">
                <MdAccountCircle className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100 "
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg ">
                <IoMail className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100 "
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center border-2 bg-gray-100 border-gray-200 p-2 rounded-lg ">
                <IoIosLock className="text-2xl text-gray-400 font-light" />
                <input
                  className="font-medium outline-none rounded-lg p-2 text-sm bg-gray-100 "
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="place-self-center my-5">
              <button
                type="submit"
                className=" border-2 border-[#77DD77] inline-block text-black hover:bg-[#77DD77] rounded-full px-12 py-2 font-semibold mb-2 hover:text-white w-full"
              >
                Sign up
              </button>
              <div className="text-center text-sm text-gray-600" />
            </div>
            </form>
           
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
