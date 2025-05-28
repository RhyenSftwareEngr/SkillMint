// src/skillmint_frontend/src/App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Placeholder components for notifications/tooltips
const Toaster = () => null;
const Sonner = () => null;
const TooltipProvider = ({ children }) => <>{children}</>;
const NotFound = () => <div>404 Not Found</div>;

// Your actual pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EventExplorerPage from "./pages/EventExplorerPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
  
);

export default App;
