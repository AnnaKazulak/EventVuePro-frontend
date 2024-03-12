import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./menu.css"


const CollapsibleMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`collapsible-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button onClick={toggleExpand} className="menu-toggle">
        <i className={`fa-solid ${isExpanded ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
      </button>
      <div className="menu-content">
        <NavLink exact to="/" activeClassName="active" className="icon-link-menu">
        <i className="fa-solid fa-house"></i>
          {isExpanded && <span className="text-menu">Home</span>}
        </NavLink>
        <NavLink exact to="/events" activeClassName="active" className="icon-link-menu">
          <i className="fa-regular fa-calendar"></i>
          {isExpanded && <span className="text-menu">Events</span>}
        </NavLink>
        <NavLink exact to="/events/create" activeClassName="active" className="icon-link-menu">
          <i className="fa-solid fa-plus"></i>
          {isExpanded && <span className="text-menu">Create Event</span>}
        </NavLink>
        <NavLink exact to="/guests" activeClassName="active" className="icon-link-menu">
          <i className="fa-solid fa-person"></i>
          {isExpanded && <span className="text-menu">Guests</span>}
        </NavLink>
        <NavLink exact to="/guests/create" activeClassName="active" className="icon-link-menu">
          <i className="fa-solid fa-person-circle-plus"></i>
          {isExpanded && <span className="text-menu">Add Guest</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
