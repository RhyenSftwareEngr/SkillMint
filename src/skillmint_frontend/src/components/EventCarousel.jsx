import React from "react";
import styles from "./EventCarousel.module.css";

function EventCarousel({ events }) {
  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        {events.map((event, idx) => (
          <div className={styles.carouselCard} key={idx}>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.description}>{event.description}</div>
            <div className={styles.date}>{new Date(event.date).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCarousel;