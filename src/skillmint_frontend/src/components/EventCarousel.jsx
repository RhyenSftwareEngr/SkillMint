import React from "react";
import PropTypes from "prop-types";
import styles from "./EventCarousel.module.css";

function EventCarousel({ events }) {
  return (
    <div className={styles.carousel}>
      {events.map((event, index) => (
        <div key={index} className={styles["carousel-item"]}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}

EventCarousel.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventCarousel;