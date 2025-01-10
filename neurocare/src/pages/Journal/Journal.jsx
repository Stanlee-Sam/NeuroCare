import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const Journal = () => {
  return (
    <div className="flex bg-[#D9D9D9] overflow-x-hidden ">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">
        <div>
          <Topbar />

        </div>
        <div>
          Journal
        </div>
        
        </div>
    </div>
  );
};

export default Journal;
