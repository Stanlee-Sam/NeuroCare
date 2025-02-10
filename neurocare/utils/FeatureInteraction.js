import axios from "axios";

export const trackFeatureUsage = async (featureName) => {
  try {
    await axios.post("http://localhost:5000/api/track-feature", { feature: featureName });
  } catch (error) {
    console.error("Error tracking feature usage:", error);
  }
};
