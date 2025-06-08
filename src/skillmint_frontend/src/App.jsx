import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { DashboardPageWithProtection } from "./pages/DashboardPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CreatedEventDetailsPage from "./pages/CreatedEventDetailsPage"; // new!
import SkillMintChatbotLauncher from "./components/SkillMintChatbotLauncher";

export default function App() {
  return (
    <>
      <div className="w-full min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPageWithProtection />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route
            path="/created-event/:id"
            element={<CreatedEventDetailsPage />}
          />
        </Routes>
      </div>
      <SkillMintChatbotLauncher />
    </>
  );
}
