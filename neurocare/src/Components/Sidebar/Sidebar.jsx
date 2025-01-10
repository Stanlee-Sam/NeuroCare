import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoJournal } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={`${
          open ? "w-72" : "w-[50px]"
        } duration-300 h-screen  bg-[#77DD77] relative`}
      >
        <img
          className={`${
            open ? "visible" : "invisible"
          } w-[80px] justify-self-center`}
          src="../../../../src/assets/Logo-no-bg.png"
          alt=""
        />
        <img
          className={`
                ${
                  !open && "rotate-180"
                } w-7 absolute top-6 -right-3 cursor-pointer rounded-full border-2 border-[#77DD77]`}
          src="../../../../src/assets/left-arrow.jpg"
          alt=""
          onClick={() => setOpen(!open)}
        />
        <ul>
          <li>
            <Link
              title="Dashboard"
              className={`font-semibold text-[18px] flex items-center my-3 gap-x-4 cursor-pointer p-2 hover:bg-[#D9D9D9] hover:border-2 hover:border-[#608BC1] hover:text-[#608BC1] rounded-l-xl transition ${
                !open && "justify-center rounded-xl m-1"
              }`}
              to="/dashboard"
            >
              <MdDashboard className="justify-center" />
              {open && <p className="">Dashboard</p>}
            </Link>{" "}
          </li>
          <li>
            <Link
              title="Journal"
              className={`font-semibold text-[18px] flex items-center my-3 gap-x-4 cursor-pointer p-2 hover:bg-[#D9D9D9] hover:border-2 hover:border-[#608BC1] hover:text-[#608BC1] rounded-l-xl transition ${
                !open && "justify-center rounded-xl m-1"
              } `}
              to="/journal"
            >
              <IoJournal />
              {open && <p>Journal</p>}
            </Link>
          </li>
          <li>
            <Link
              title="NeuroBot"
              className={`font-semibold text-[18px] flex items-center my-3 gap-x-4 cursor-pointer p-2 hover:bg-[#D9D9D9] hover:border-2 hover:border-[#608BC1] hover:text-[#608BC1] rounded-l-xl transition ${
                !open && "justify-center rounded-xl m-1"
              } `}
              to="/neurobot"
            >
              <FaRobot />
              {open && <p>NeuroBot</p>}
            </Link>
          </li>
          <li>
            <Link
              title="Resources"
              className={`font-semibold text-[18px] flex items-center my-3 gap-x-4 cursor-pointer p-2 hover:bg-[#D9D9D9] hover:border-2 hover:border-[#608BC1] hover:text-[#608BC1] rounded-l-xl transition ${
                !open && "justify-center rounded-xl m-1"
              } `}
              to="/resources"
            >
              <GrResources  />
              {open && <p>Resources</p>}
            </Link>
          </li>
          <li>
            <Link
              title="Settings & Profile"
              className={`font-semibold text-[18px] flex items-center my-3 gap-x-4 cursor-pointer p-2 hover:bg-[#D9D9D9] hover:border-2 hover:border-[#608BC1] hover:text-[#608BC1] rounded-l-xl transition ${
                !open && "justify-center rounded-xl m-1"
              } `}
              to="/settings and profile"
            >
              <IoSettings />
              {open && <p>Settings & Profile</p>}
            </Link>
          </li>
        </ul>
        <div className="flex justify-center items-center absolute bottom-0 w-full h-24 bg-[#77DD77]">
          <button title="Logout" className=" border-2 border-black text-black hover:bg-white hover:text-[#77DD77] hover:border-white p-2 gap-2 rounded-full flex justify-between items-center font-bold">
            <RiLogoutCircleLine className="font-bold" />
            {open && <p>Logout</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
