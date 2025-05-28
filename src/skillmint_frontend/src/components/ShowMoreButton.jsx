function ShowMoreButton({ onClick, isLoading }) {
  return (
    <button
      className="show-more-button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading-spinner"></span>
      ) : (
        "Show More"
      )}
    </button>
  );
}
ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
ShowMoreButton.defaultProps = {
  isLoading: false,
};
import PropTypes from 'prop-types';
export default ShowMoreButton;