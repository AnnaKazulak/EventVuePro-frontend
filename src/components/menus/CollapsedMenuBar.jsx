import { NavLink } from 'react-router-dom';
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
                <NavLink exact to="/" activeClassName="active" className="icon-link">
                    <i className="fa-solid fa-house"></i>
                </NavLink>
            </div>
            <div className="menu-section">
                <NavLink exact to="/events" activeClassName="active" className="icon-link">
                    <i className="fa-regular fa-calendar"></i>
                </NavLink>
                <NavLink exact to="/events/create" activeClassName="active" className="icon-link">
                    <i className="fa-solid fa-plus"></i>
                </NavLink>
            </div>
            <div className="menu-section">
                <NavLink exact to="/guests" activeClassName="active" className="icon-link">
                    <i className="fa-solid fa-person"></i>
                </NavLink>
                <NavLink exact to="/guests/create" activeClassName="active" className="icon-link">
                    <i className="fa-solid fa-person-circle-plus"></i>
                </NavLink>
            </div>
        </div>
    );
};

CollapsedMenuBar.propTypes = {
    onExpand: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
};

export default CollapsedMenuBar;