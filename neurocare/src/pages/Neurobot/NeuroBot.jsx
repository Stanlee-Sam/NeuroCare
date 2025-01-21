import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const NeuroBot = () => {

  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Session 1", lastUpdated: "Today, 10:30 AM" },
    { id: 2, title: "Session 2", lastUpdated: "Yesterday, 4:45 PM" },
  ]);

  const [currentChat, setCurrentChat] = useState(null);

  const handleSelectChat = (id) => {
    const selectedChat = chatHistory.find((chat) => chat.id === id);
    setCurrentChat(selectedChat);
  }

  return (
    <div className="flex bg-[#D9D9D9] overflow-x-hidden">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">
        <div>
          <Topbar />
        </div>
        <div className="flex flex-row gap-1 pl-10 md:pl-14 h-screen"> 
          <div className="w-1/3 bg-gray-100 border-r rounded-lg">
            <div className="p-4 font-bold text-xl border-b"> 
              Chat History
            </div>
            <ul className="p-4 space-y-2">
              {chatHistory.map((chat) => (
                <li key={chat.id} className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200" onClick={() => handleSelectChat(chat.id)}>
                  <p className="font-semibold ">{chat.title}</p>
                  <p className="text-sm text-gray-500">{chat.lastUpdated}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 p-4">
            {currentChat ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentChat.title}</h2>
                <p>chat content for {currentChat.title}</p>
              </div>
            ) : (
              <p>Select a chat from the history to begin</p>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroBot;