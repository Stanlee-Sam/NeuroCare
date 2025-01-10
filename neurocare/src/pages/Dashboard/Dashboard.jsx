import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const Dashboard = () => {
  return (
    <div className="flex bg-[#D9D9D9] overflow-x-hidden ">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">
        {/* Top-bar */}
        <div>
          <Topbar />
        </div>
        <div>Dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
