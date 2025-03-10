import { ScatterBoxLoader } from "react-awesome-loaders";
import "./loader.css"
const ScatterBoxLoaderComponent = () => {
  return (
    <div className="loader-container">
      <ScatterBoxLoader
        primaryColor={"#6366F1"} // Adjust color as needed
        background={"#F9FAFB"} // Light background
      />
    </div>
  );
};

export default ScatterBoxLoaderComponent;
