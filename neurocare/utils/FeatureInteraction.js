import axios from "axios";
import { auth } from "../src/Components/Firebase/firebase";

export const trackFeatureUsage = async (featureName) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const token = await user.getIdToken();


    await axios.post(
      "http://localhost:5000/api/track-feature",
      { feature: featureName },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );  } catch (error) {
    console.error("Error tracking feature usage:", error);
  }
};
