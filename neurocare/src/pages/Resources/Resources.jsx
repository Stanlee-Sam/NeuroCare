import Sidebar from "../../Components/Sidebar/Sidebar";
import Topbar from "../../Components/Topbar/Topbar";

const Resources = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="p-5 text-2xl h-screen flex-1 bg-[#D9D9D9] overflow-x-hidden">
        <div>
          <Topbar/>
        </div>
        <div>
        Resources

        </div>
        </div>
    </div>
  );
};

export default Resources;
