import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import EventExplorerPage from "./pages/EventExplorerPage";
import OrganizerDashboardPage from "./pages/OrganizerDashboardPage";
import { Container } from "@mui/material";
import { useState } from "react";
// import { skillmint_backend } from "declarations/skillmint_backend";

function App() {
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    skillmint_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/events" element={<EventExplorerPage />} />
          <Route path="/organizer" element={<OrganizerDashboardPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
