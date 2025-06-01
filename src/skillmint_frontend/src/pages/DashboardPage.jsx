import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";
import LeftSidebar from "../components/LeftSidebar";
import Carousel from "../components/Carousel";
import EventsGrid from "../components/EventsGrid";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarWidth = 400;

  return (
    <div className="bg-[#E8E8E8] min-h-screen flex flex-col font-sans">
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
      <div className="flex-1 flex flex-row relative">
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div
          className={`flex-1 flex flex-row transition-all duration-300`}
          style={{
            maxWidth: drawerOpen ? `calc(100vw - ${sidebarWidth}px)` : "1200px",
            marginRight: drawerOpen ? `${sidebarWidth}px` : "auto",
          }}
        >
          <LeftSidebar />
          <main className="flex-1 flex flex-col min-w-0 px-6 py-6">
            <Carousel />
            <EventsGrid />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
