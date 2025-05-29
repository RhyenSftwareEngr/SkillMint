import React from "react";
import styles from "./EventCard.module.css";

function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage} />
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          {event.tags && event.tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>{tag}</span>
          ))}
          {event.daysLeft !== undefined && (
            <span className={styles.daysLeft}>{event.daysLeft} days left</span>
          )}
        </div>
        <div className={styles.cardTitle}>{event.title} – {event.description}</div>
        <div className={styles.date}>
          {event.date}
        </div>
        {event.badge && (
          <div className={styles.badge}>{event.badge}</div>
        )}
      </div>
    </div>
  );
}

export default EventCard;