import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const CollapsedMenuBar = ({ onExpand, isExpanded }) => {
    const handleToggleExpand = () => {
        onExpand(!isExpanded);
    };

    const handleClose = () => {
        onExpand(false);
    };

    return (
        <div className={`collapsed-menu-bar ${isExpanded ? 'expanded' : ''}`}>
            <div className="expand-button" onClick={handleToggleExpand}>
                <i className={`fa-solid ${isExpanded ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
            </div>
            {isExpanded && (
                <div className="close-button" onClick={handleClose}>
                </div>
            )}
            <div className="menu-section">
                <Link to="/">
                    <i className="fa-solid fa-house"></i>
                </Link>

            </div>
            <div className="menu-section">
                <Link to="/events">
                    <i className="fa-regular fa-calendar"></i>
                </Link>
                <Link to="/events/create">
                    <i className="fa-solid fa-plus"></i>
                </Link>
            </div>
            <div className="menu-section">
                <Link to="/guests">
                    <i className="fa-solid fa-person"></i>
                </Link>
                <Link to="/guests/create">
                    <i className="fa-solid fa-person-circle-plus"></i>
                </Link>
            </div>
        </div>
    );
};

CollapsedMenuBar.propTypes = {
    onExpand: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
};

export default CollapsedMenuBar;