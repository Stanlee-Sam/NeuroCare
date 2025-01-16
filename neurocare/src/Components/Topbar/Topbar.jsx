import { FaBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="h-16 flex flex-row justify-between items-center  px-2 max-w-full top-0 z-12 pl-12 md:pl-14">
      <div className="flex items-center  relative font-light   ">
        <input
          type="text"
          className="rounded-full pl-8 text-[15px]  border-2 bg-[#D9D9D9] border-gray-500"
          placeholder="Search..."
        />
        <IoMdSearch className="absolute left-1 text-gray-500 " />
      </div>
      <div className="flex ml-1 space-x-5 items-center">
        <div className="relative">
          <FaBell />
          <div className="absolute bottom-4 right-0 text-sm bg-red-600 w-2 h-2 rounded-full animate-pulse">
            
          </div>
        </div>
        <div className="w-8">
          <img
            className="w-full rounded-full"
            src="../../../src/assets/avatar.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
