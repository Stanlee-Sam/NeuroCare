import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
// import Topbar from "../../Components/Topbar/Topbar";

import { LuMessageSquareMore } from "react-icons/lu";
import { LuBotMessageSquare } from "react-icons/lu";
import { PiFlowerThin } from "react-icons/pi";
import { IoBulbOutline } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
const NeuroBot = () => {
  const [chatHistory,  setChatHistory] = useState([
    { id: 1, title: "Session 1", lastUpdated: "Today, 10:30 AM" },
    { id: 2, title: "Session 2", lastUpdated: "Yesterday, 4:45 PM" },
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelectChat = (id) => {
    const selectedChat = chatHistory.find((chat) => chat.id === id);
    setCurrentChat(selectedChat);
  };

  return (
    <div className="flex max-h-screen bg-[#D9D9D9] overflow-x-hidden">
      <Sidebar />
      <div className=" text-2xl h-screen flex flex-col items-center flex-1 w-full">
        <div className="h-20 w-20 md:h-15 md:w-15">
          <img
            className="w-15 h-15"
            src="../../../src/assets/NeuroBot Logo.png"
            alt=""
          />
        </div>
        <div className="flex flex-row  gap-1 pl-10 md:pl-14  h-screen pb-3 w-full">
          <div className="w-full px-4 ">
            {currentChat ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentChat.title}</h2>
                <p>chat content for {currentChat.title}</p>
              </div>
            ) : (
              <div>
                <div className="space-y-4 md:h-[20vh] flex flex-col items-center ">
                  <h1 className="font-bold text-4xl">
                    Hello, <span className="text-[#608BC1]">Dev</span>
                  </h1>
                  <p className="font-light text-[15px] text-center">
                    Welcome to NeuroBot! 🌱 Take a moment to explore helpful
                    tips and insights before starting your conversation.
                  </p>
                </div>
                <div className="md:flex flex-col md:flex-row gap-4 h-full hidden md:visible">
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4 grid grid-rows-1 gap-10 hover:bg-slate-500 transition hover:text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl hover:border-2 hover:border-[#77DD77] ">
                    <p className="text-gray-900 text-[15px] font-semibold  ">
                      Share your thoughts with NeuroBot, and let it provide
                      thoughtful responses to guide you.
                    </p>
                    <div className="bg-white border-2  border-gray-900 place-self-end rounded-full p-2">
                      <LuMessageSquareMore className="text-gray-900  hover:animate-bounce " />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4 grid grid-rows-1 gap-10 hover:bg-slate-500 transition hover:text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl hover:border-2 hover:border-[#77DD77] ">
                    <p className="text-gray-900 text-[15px] font-semibold  ">
                      Small steps can make a big difference. Learn daily habits
                      to boost your mood and well-being.
                    </p>
                    <div className="bg-white border-2  border-gray-900 place-self-end rounded-full p-2">
                      <PiFlowerThin className="text-gray-900  hover:animate-bounce " />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4 grid grid-rows-1 gap-10 hover:bg-slate-500 transition hover:text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl hover:border-2 hover:border-[#77DD77] ">
                    <p className="text-gray-900 text-[15px] font-semibold  ">
                      Not sure where to start? NeuroBot is here to help with
                      guidance and personalized insights.{" "}
                    </p>
                    <div className="bg-white border-2  border-gray-900 place-self-end rounded-full p-2">
                      <LuBotMessageSquare className="text-gray-900  hover:animate-bounce " />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4 grid grid-rows-1 gap-10 hover:bg-slate-500 transition hover:text-white ease-in-out delay-150 hover:-translate-y-1 hover:scale-130 hover:shadow-2xl hover:border-2 hover:border-[#77DD77] ">
                    <p className="text-gray-900 text-[15px] font-semibold  ">
                      Reflecting on your thoughts for just 5 minutes daily can
                      significantly improve your emotional well-being.{" "}
                    </p>
                    <div className="bg-white border-2  border-gray-900 place-self-end rounded-full p-2">
                      <IoBulbOutline className="text-gray-900  hover:animate-bounce " />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 w-[90%]  md:p-4 rounded-lg m-auto">
                  <div className="flex justify-between items-center bg-white rounded-full px-2 py-1">
                    <input
                      type="text"
                      placeholder="Enter a prompt here"
                      className="flex-1 outline-none border-none bg-transparent p-2 text-[18px]"
                    />
                    <div className="flex gap-3 mr-3 ">
                      <CiMicrophoneOn className="cursor-pointer text-gray-600 hover:text-gray-900" />
                      <BsSend className="cursor-pointer text-gray-600 hover:text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={` bg-gray-100 border-r rounded-l-lg fixed right-0 ${
              open ? "md:w-1/4" : "w-[40px]"
            }`}
          >
            {open ? (
              <div>
                <div className="p-4 font-bold text-xl border-b">
                  Chat History
                </div>
                <div>
                  <img
                    className={`
                ${
                  open && "rotate-180"
                } w-7 absolute bottom-[50%] -left-3 cursor-pointer rounded-full border-2 border-[#77DD77]  `}
                    onClick={() => setOpen(!open)}
                    src="../../../src/assets/left-arrow.jpg"
                    alt=""
                  />
                </div>
                <ul
                  className={`overflow-y-auto ${
                    open ? "h-[60vh] p-4 space-y-2 " : "h-[60vh] hidden"
                  } `}
                >
                  {chatHistory.map((chat) => (
                    <li
                      key={chat.id}
                      className={`p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200`}
                      onClick={() => handleSelectChat(chat.id)}
                    >
                      <p className="font-semibold ">{chat.title}</p>
                      <p className="text-sm text-gray-500">
                        {chat.lastUpdated}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-5 font-bold  ">
                <img
                  className={`
                ${
                  open && "rotate-180"
                } w-7 absolute bottom-4 -left-3 cursor-pointer rounded-full border-2 border-[#77DD77] `}
                  onClick={() => setOpen(!open)}
                  src="../../../src/assets/left-arrow.jpg"
                  alt=""
                />
                <MdHistory className="w-5 " />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroBot;
