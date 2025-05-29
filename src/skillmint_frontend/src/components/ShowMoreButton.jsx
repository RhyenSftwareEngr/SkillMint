import React from "react";
import PropTypes from "prop-types";
import styles from "./ShowMoreButton.module.css";

function ShowMoreButton({ onClick }) {
  return (
    <button className={styles.showMoreBtn} onClick={onClick}>
      Show More
    </button>
  );
}

ShowMoreButton.propTypes = {
  onClick: PropTypes.func,
};

export default ShowMoreButton;