import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import EventDetailsPage from "./pages/EventDetailsPage";
// import other pages as needed

function App() {
  return (
    // Main wrapper: disables accidental horizontal scroll, makes layout clean
    <div className="w-full min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
