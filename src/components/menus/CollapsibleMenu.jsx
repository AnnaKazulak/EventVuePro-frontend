import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import PropTypes from 'prop-types';

import "./menu.css";

const CollapsibleMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logOutUser } = useContext(AuthContext);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`collapsible-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="menu-content">
        <button onClick={toggleExpand} className="menu-toggle mb-5">
          <i className={`fa-solid ${isExpanded ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
        </button>
        <NavLink exact to="/" activeclassname="active" className="icon-link-menu">
          <i className="fa-solid fa-house"></i>
          {isExpanded && <span className="text-menu">Home</span>}
        </NavLink>
        <NavLink exact to="/events" activeclassname="active" className="icon-link-menu">
          <i className="fa-regular fa-calendar"></i>
          {isExpanded && <span className="text-menu">Events</span>}
        </NavLink>
        <NavLink exact to="/events/create" activeclassname="active" className="icon-link-menu">
          <i className="fa-solid fa-plus"></i>
          {isExpanded && <span className="text-menu">Create Event</span>}
        </NavLink>
        <NavLink exact to="/guests" activeclassname="active" className="icon-link-menu">
          <i className="fa-solid fa-person"></i>
          {isExpanded && <span className="text-menu">Guests</span>}
        </NavLink>
        <NavLink exact to="/guests/create" activeclassname="active" className="icon-link-menu">
          <i className="fa-solid fa-person-circle-plus"></i>
          {isExpanded && <span className="text-menu">Add Guest</span>}
        </NavLink>

        {!isExpanded ? (
          <button onClick={logOutUser} className="icon-logout-menu mt-5">
            <i className="fa-solid fa-power-off"></i>
          </button>
        ) : (
          <button onClick={logOutUser} className="icon-logout-menu mt-5">
            <i className="fa-solid fa-power-off"></i>
            <span className='text-menu'>Logout</span>
          </button>

        )}
      </div>
    </div>
  );
};

CollapsibleMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default CollapsibleMenu;