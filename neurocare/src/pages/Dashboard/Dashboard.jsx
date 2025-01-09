import Sidebar from "../../Components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1">Dashboard</div>
    </div>
  );
};

export default Dashboard;
