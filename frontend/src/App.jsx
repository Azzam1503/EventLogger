import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Signup from "./components/Signup";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
import Event from "./pages/Event";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
