import React, { useState } from "react";
import styles from "./DashboardPage.module.css";
import Sidebar from "../components/Sidebar";
import EventCarousel from "../components/EventCarousel";
import Tabs from "../components/Tabs";
import SortDropdown from "../components/SortDropdown";
import EventCard from "../components/EventCard";
import ShowMoreButton from "../components/ShowMoreButton";
import ProfileSidebar from "../components/ProfileSidebar";

function DashboardPage() {
  const events = [
    { title: "Hackathon", description: "Blockchain Week 2025", date: "2025-06-06" },
    // ...add more event objects
  ];

  // Tabs state
  const tabOptions = ["All Events", "Created Events"];
  const [activeTab, setActiveTab] = useState(tabOptions[0]);

  // SortDropdown state
  const sortOptions = ["Newest", "Oldest"];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  return (
    <div className={styles.dashboardRoot}>
      <Sidebar />
      <main className={styles.mainContent}>
        <EventCarousel events={events} />
        <div className={styles.topBar}>
          <Tabs tabs={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
          <SortDropdown options={sortOptions} selected={selectedSort} onChange={setSelectedSort} />
        </div>
        <div className={styles.eventsGrid}>
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
        <ShowMoreButton />
      </main>
      <ProfileSidebar />
    </div>
  );
}

export default DashboardPage;