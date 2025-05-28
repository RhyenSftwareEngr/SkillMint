function SortDropdown({ options, selectedOption, onSelect }) {
  return (
    <div className="sort-dropdown">
      <select
        value={selectedOption}
        onChange={(e) => onSelect(e.target.value)}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}   
SortDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};  
import PropTypes from 'prop-types';
export default SortDropdown;