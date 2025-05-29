import React from "react";
import styles from "./DashboardPage.module.css";
import Sidebar from "../components/Sidebar";
import EventCarousel from "../components/EventCarousel";
import EventCard from "../components/EventCard";

const events = [
  {
    title: "Hackathon",
    description: "Philippine Blockchain Week 2025",
    date: "2025-06-06",
    tags: ["Virtual", "Upcoming"],
    daysLeft: 12,
    badge: "Badge"
  },
  {
    title: "Webinar",
    description: "Future of AI",
    date: "2025-06-07",
    tags: ["Virtual", "Ongoing"],
    daysLeft: 12,
    badge: "Badge"
  },
  {
    title: "Workshop",
    description: "Blockchain Basics",
    date: "2025-06-08",
    tags: ["In-person", "Upcoming"],
    daysLeft: 13,
    badge: "Badge"
  },
  {
    title: "Conference",
    description: "Tech Innovations 2025",
    date: "2025-06-09",
    tags: ["Virtual", "Ongoing"],
    daysLeft: 14,
    badge: "Badge"
  },
  {
    title: "Hackathon",
    description: "Philippine Blockchain Week 2025",
    date: "2025-06-10",
    tags: ["Virtual", "Upcoming"],
    daysLeft: 15,
    badge: "Badge"
  }
];

function DashboardPage() {
  return (
    <div className={styles.dashboardRoot}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <EventCarousel events={events} />
        <div className={styles.topBar}>
          <h2>Events</h2>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.tabActive}`}>All Events</button>
            <button className={styles.tab}>Created Events</button>
          </div>
          <div className={styles.sortDropdown}>
            <button>Sort ▾</button>
          </div>
        </div>
        <div className={styles.eventsGrid}>
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;