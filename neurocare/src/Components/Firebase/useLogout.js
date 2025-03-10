
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

// user logout
export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    try {
      await signOut(auth); 
      console.log("User logged out successfully!");
      navigate("/");  
      toast.success("You have been logged out", { position: "top-center" });
    } catch (error) {
      console.error("Error logging out user:", error);
      toast.error("Failed to log out. Please try again.", { position: "bottom-center" });
    }
  };
};
