// pages/DashboardPage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";
import LeftSidebar from "../components/LeftSidebar";
import Carousel from "../components/Carousel";
import EventsGrid from "../components/EventsGrid";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarWidth = 400; // For desktop drawer width

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E8E8E8]">
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
      <div className="flex-1 flex flex-col md:flex-row w-full relative transition-all duration-300">
        {/* Profile Drawer (overlays on right, always on top) */}
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Main layout: Sidebar and Main content */}
        <div
          className={`
            flex-1 flex flex-col md:flex-row w-full
            transition-all duration-300
            ${drawerOpen ? "md:mr-[400px]" : ""}
          `}
          style={{
            maxWidth: drawerOpen ? undefined : "1200px",
            margin: drawerOpen ? "0" : "0 auto",
          }}
        >
          {/* Sidebar (Left), stack on mobile, side on desktop */}
          <aside className="w-full md:w-80 max-w-full md:max-w-xs mb-4 md:mb-0 md:pr-4">
            <LeftSidebar />
          </aside>
          {/* Main area */}
          <main className="flex-1 flex flex-col min-w-0 px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
            <Carousel />
            <EventsGrid />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
