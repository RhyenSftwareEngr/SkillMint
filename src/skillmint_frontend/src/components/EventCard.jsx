import React from "react";
import PropTypes from "prop-types";
import styles from "./EventCard.module.css";

function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{event.title}</div>
      <div className={styles.description}>{event.description}</div>
      <div className={styles.date}>
        {new Date(event.date).toLocaleDateString()}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;