import axios from "axios";
import { auth } from "../src/Components/Firebase/firebase";

export const trackFeatureUsage = async (featureName) => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const token = await user.getIdToken();

    await axios.post(
      `${API_BASE_URL}/api/track-feature`,
      { feature: featureName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error tracking feature usage:", error);
  }
};
