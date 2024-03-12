import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './button.css';

function Button({ label, to, onClick, className }) {
  return (
    <>
      {to && (
        <Link to={to} className={className}>
          {label}
        </Link>
      )}
      {!to && (
        <button onClick={onClick} className={className}>
          {label}
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
