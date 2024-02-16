import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import "./App.css";
import Signup from "./components/Signup";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
