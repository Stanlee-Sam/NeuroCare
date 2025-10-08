import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../../Components/Firebase/firebase.js";

const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const response = await axios.get("http://localhost:5000/api/journal", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      toast.info("Deleting activity...");
      await axios.delete(`http://localhost:5000/api/journal/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities(activities.filter((activity) => activity.id !== id));
      toast.success("Activity deleted successfully");
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Error deleting activity");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-h-[400px] md:max-h-[700px] ">
      <div className="overflow-y-auto flex flex-col gap-4 scrollable-container rounded-lg">
      <div>
              <h1 className="text-center font-bold pt-2">Recent Activity</h1>
            </div>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className=" bg-gray-300 p-4 rounded-lg flex flex-col gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:shadow-xl"
          >
            

            <div className="flex justify-between items-center">
              <div className="flex justify-between gap-1">
                <h1 className="font-bold lg:text-[17px] text-[10px]">
                  {activity.sentiment}
                </h1>
                <p className="text-[12px] lg:text-[19px]">
                  {activity.sentiment === "Positive"
                    ? "🙂"
                    : activity.sentiment === "Neutral"
                    ? "😐"
                    : "😔"}
                </p>
              </div>
              <div className="flex justify-evenly gap-1">
                <h1 className="font-bold lg:text-[15px] text-[9px]">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </h1>
                <h1 className="font-bold lg:text-[15px] text-[9px]">
                  {new Date(activity.createdAt).toLocaleTimeString()}
                </h1>
              </div>
            </div>
            <div>
              <p className="lg:text-[15px] text-[9px]">
                &quot;{activity.text}&quot;
              </p>
            </div>
            <div className="gap-2 w-full justify-self-end">
              {/* <button className='rounded-lg bg-[#608BC1] md:p-2 md:text-[15px] text-[12px] font-bold w-[90px] hover:bg-[#77DD77] hover:text-white'>Edit</button> */}
              <button
                onClick={() => handleDelete(activity.id)}
                className="w-[90px] rounded-lg bg-[#dd0707] md:p-2 md:text-[15px] text-[12px] font-bold  hover:bg-[#f70303] hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
