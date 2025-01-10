import { FaBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="h-16 flex justify-between items-center  px-2 w-full top-0 z-12">
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
          <span className="absolute bottom-4 right-0 text-sm text-red-600">
            0
          </span>
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
