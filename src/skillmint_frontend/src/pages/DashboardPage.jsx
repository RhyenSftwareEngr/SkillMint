import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";
import LeftSidebar from "../components/LeftSidebar";
import Carousel from "../components/Carousel";
import EventsGrid from "../components/EventsGrid";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E8E8E8]">
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
      <div className="flex-1 flex w-full relative transition-all duration-300">
        {/* Main layout: Sidebar and Main content */}
        <div
          className={`flex-1 flex flex-col md:flex-row w-full min-w-0 transition-all duration-300 ${
            drawerOpen ? "md:mr-[420px]" : ""
          }`}
        >
          {/* Sidebar (Left) */}
          <aside className="w-full md:w-80 max-w-full md:max-w-xs mb-4 md:mb-0 md:pr-4">
            <LeftSidebar />
          </aside>
          {/* Main Area */}
          <main className="flex-1 flex flex-col min-w-0 px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
            <Carousel />
            <EventsGrid />
          </main>
        </div>

        {/* Profile Drawer (as a sibling) */}
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
      <Footer />
    </div>
  );
}
