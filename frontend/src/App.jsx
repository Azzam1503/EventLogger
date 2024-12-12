import { Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Signup from "./components/Signup";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
import Event from "./pages/Event";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ExportEvents from "./pages/ExportEvents";
import "./index.css";
import { useContext } from "react";
import UserContext from "./context/UserContext";


function App() {
  const {user} = useContext(UserContext);
  return (
    <div className="w-full min-h-screen bg-richblack-900 dark:bg-[#ede9fe]">
    <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exportEvents" element={<ExportEvents />} />
          <Route path="/events" element={<Events user={user} />} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-profile" element={<UserProfile user={user} />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
    </div>
  );
}

export default App;
