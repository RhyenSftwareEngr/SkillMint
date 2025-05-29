import React from "react";
import PropTypes from "prop-types";
import styles from "./SortDropdown.module.css";

function SortDropdown({ options, selected, onChange }) {
  return (
    <div className={styles.dropdown}>
      <select
        className={styles.select}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

SortDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortDropdown;