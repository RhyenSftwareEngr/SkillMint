import React from "react";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.upcomingEvents}>
        <h4>My Upcoming Events</h4>
        {/* Example event list */}
        <ul>
          <li>
            <strong>6 June</strong> <br />
            Hackathon – Blockchain Week 2025
          </li>
          <li>
            <strong>7 June</strong> <br />
            Hackathon – Blockchain Week 2025
          </li>
        </ul>
        <a href="#" className={styles.showAll}>Show All</a>
      </div>
      <div className={styles.calendar}>
        <h4>May 2025</h4>
        {/* Placeholder for calendar widget */}
        <div className={styles.calendarWidget}>[Calendar]</div>
        <a href="#" className={styles.showCalendar}>Show Calendar</a>
      </div>
    </aside>
  );
}

export default Sidebar;