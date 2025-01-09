import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Sign up/SignIn.Jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Journal from "./pages/Journal/Journal";
import NeuroBot from "./pages/Neurobot/NeuroBot";
import Resources from "./pages/Resources/Resources";
import Settings from "./pages/SettingsProfile/Settings";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/neurobot" element={<NeuroBot />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings and profile" element={<Settings />} />






      </Routes>
    </Router>
  );
};

export default App;
