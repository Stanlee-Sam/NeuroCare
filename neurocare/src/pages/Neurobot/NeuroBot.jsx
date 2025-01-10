import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const NeuroBot = () => {
  return (
    <div className="flex bg-[#D9D9D9] overflow-x-hidden">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">
        <div>
          <Topbar />
        </div>
        <div> NeuroBot</div>
      </div>
    </div>
  );
};

export default NeuroBot;
