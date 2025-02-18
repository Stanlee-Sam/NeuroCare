import { useEffect, useRef, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { LuMessageSquareMore } from "react-icons/lu";
import { PiFlowerThin } from "react-icons/pi";
import { CiMicrophoneOn } from "react-icons/ci";
import { LuBotMessageSquare } from "react-icons/lu";
import { BsSend } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { trackFeatureUsage } from "../../../utils/FeatureInteraction.js";
import { CiCirclePlus } from "react-icons/ci";
import { IoBulbOutline } from "react-icons/io5";







const NeuroBot = () => {
  useEffect(() => {
    trackFeatureUsage("NeuroBot");
  }, []);

  const inputRef = useRef();
  const messagesEndRef = useRef(null)

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Chat 1",
      messages: [],
    },
  ]);

  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [open, setOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);

  useEffect(() => {
    if(messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat.messages]);

  const handleSelectChat = (id) => {
    const selectedChat = chats.find((chat) => chat.id === id);
    setCurrentChat(selectedChat);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const newMessages = [
      ...currentChat.messages,
      { role: "user", text: userMessage },
    ];

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat.id ? { ...chat, messages: newMessages } : chat
      )
    );

    setCurrentChat((prevChat) => ({ ...prevChat, messages: newMessages }));

    try {
      const botResponse = await  getBotResponse(userMessage)

      const updatedMessages = [
        ...newMessages,
        { role: "bot", text: botResponse },
      ];

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id? {...chat, messages: updatedMessages } : chat
        )
      );
      setCurrentChat((prevChat) => ({...prevChat, messages: updatedMessages }));

    }catch(error){
      console.error("Error calling Gemini API :", error);

      const errorMessages = [
        ...newMessages,
        { role: "bot", text: "Sorry, something went wrong. Please try again later." },
      ];
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id ? { ...chat, messages: errorMessages } : chat
        )
      );
      setCurrentChat((prevChat) => ({ ...prevChat, messages: errorMessages }));
    }

  }
  const addPunctuation = (text) => {
    // Replace markdown-style bullet points (asterisks) with HTML <ul><li> for bullet points
    const bulletPointText = text.replace(/\* (.*?)(?=\n|\r|$)/g, (match, p1) => {
      return `<ul><li>${p1}</li></ul>`; // Wrap each bullet point with <ul><li>
    });
  
    // Regular expression to match sentence-ending punctuation
    const sentenceEndings = /[.!?]/;
  
    // Split the cleaned text by common sentence delimiters
    let sentences = bulletPointText.split(/([.!?])/).filter(Boolean);
  
    // Make sure sentences end with punctuation (add a period if none exists)
    sentences = sentences.map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      // Add punctuation if not present
      if (index % 2 === 0) {
        // If it's the last sentence, ensure it ends with punctuation
        return sentenceEndings.test(trimmedSentence) ? trimmedSentence : trimmedSentence + '.';
      }
      return sentence; // Keep punctuation marks (., ?, !)
    });
  
    // Join the sentences back together with a space between each
    return sentences.join('').trim();
  };
  

  const getBotResponse = async (userMessage) => {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userMessage })
        });

        
        if (!response.ok) {
            throw new Error('Failed to get response from the server');
        }

        const data = await response.json(); 
        console.log("Bot Response:", data); 

        return addPunctuation(data.reply); 
      } catch (error) {
        console.error("Error:", error); 
        return "Sorry, something went wrong. Please try again.";
    }
};


  return (
    <div className="flex max-h-screen bg-[#D9D9D9] overflow-x-hidden">
      <Sidebar />
      <div className="text-2xl h-screen flex flex-col items-center flex-1 w-full">
        <div className="h-20 w-20 md:h-15 md:w-15">
          <img className="w-15 h-15" src="../../../src/assets/NeuroBot Logo.png" alt="" />
        </div>
        <div className="flex flex-row gap-1 pl-10 md:pl-14 h-screen pb-3 w-full">
          <div className="w-full px-4">
            {!hasStartedChat ? (
              <div>
                <div className="space-y-4 md:h-[20vh] flex flex-col items-center p-4">
                  <h1 className="font-bold text-4xl">
                    Hello, <span className="text-[#608BC1]">Dev</span>
                  </h1>
                  <p className="text-[20px] font-semibold text-center">
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
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pb-16 md:pb-20">
                {currentChat.messages.map((message, index) => (
                  <div
  key={index}
  className={`p-3 rounded-lg ${message.role === "user" ? "bg-[#608BC1] text-white self-end max-w-[80%] text-[18px]" : "text-black w-full text-[18px]"}`}
  dangerouslySetInnerHTML={{ __html: message.text }} // This will allow HTML to be rendered
/>

                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat Input */}
            <div className="absolute bottom-0 w-[90%] md:p-4 rounded-lg m-auto">
              <form
                action="#"
                onSubmit={handleFormSubmit}
                className="flex justify-between items-center bg-white rounded-full px-2 py-1"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter a prompt here"
                  className="flex-1 outline-none border-none bg-transparent p-2 text-[18px]"
                />
                <div className="flex gap-3 mr-3">
                  <CiMicrophoneOn className="cursor-pointer text-gray-600 hover:text-gray-900" />
                  <button type="submit">
                    <BsSend className="cursor-pointer text-gray-600 hover:text-gray-900" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Chat History Sidebar */}
          <div className={`bg-gray-100 border-r rounded-l-lg fixed right-0 ${open ? "md:w-1/4" : "w-[40px]"}`}>
            {open ? (
              <div>
                <div className="p-4 font-bold text-xl border-b">Chat History</div>
                <img
                  className={`${open && "rotate-180"} w-7 absolute bottom-[50%] -left-3 cursor-pointer rounded-full border-2 border-[#77DD77]`}
                  onClick={() => setOpen(!open)}
                  src="../../../src/assets/left-arrow.jpg"
                  alt=""
                />
                <div className="p-2 grid justify-center">
                  <button className="flex flex-row gap-1 items-center p-2 hover:animate-pulse bg-[#77DD77] md:w-full rounded-lg hover:bg-[#608BC1] hover:text-white">
                    <CiCirclePlus />
                    <p className="text-[20px] font-semibold">New chat</p>
                  </button>
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className="block mt-2 text-left w-full p-2 rounded-lg bg-white hover:bg-gray-300"
                    >
                      {chat.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <MdHistory className="w-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroBot;
