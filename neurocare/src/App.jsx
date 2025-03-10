import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Signup/SignIn.Jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Journal from "./pages/Journal/Journal";
import NeuroBot from "./pages/Neurobot/NeuroBot";
import Resources from "./pages/Resources/Resources";
import Settings from "./pages/SettingsProfile/Settings";
import { ToastContainer } from "react-toastify";
import { AuthProvider, ProtectedRoute } from "./Components/Firebase/session.jsx";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  {" "}
                  <Journal />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/neurobot"
              element={
                <ProtectedRoute>
                  {" "}
                  <NeuroBot />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  {" "}
                  <Resources />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings and profile"
              element={
                <ProtectedRoute>
                  {" "}
                  <Settings />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
