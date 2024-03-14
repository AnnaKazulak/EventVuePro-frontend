import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import './buttons/button.css';

const OffcanvasComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logOutUser } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle menu state
    };

    const handleNavLinkClick = () => {
        setIsOpen(false); // Close offcanvas when NavLink is clicked
    };

    return (
        <>
            <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-body pt-5" style={{ backgroundColor: '#010a35' }}>
                    <div className="menu-content">
                        <NavLink exact to="/" activeClassName="active" className="icon-link-menu" onClick={handleNavLinkClick}>
                            <i className="fa-solid fa-house"></i> <span className="text-menu">Home</span>
                        </NavLink>
                        <NavLink exact to="/events" activeClassName="active" className="icon-link-menu" onClick={handleNavLinkClick}>
                            <i className="fa-regular fa-calendar"></i> <span className="text-menu">Events</span>
                        </NavLink>
                        <NavLink exact to="/events/create" activeClassName="active" className="icon-link-menu" onClick={handleNavLinkClick}>
                            <i className="fa-solid fa-plus"></i> <span className="text-menu">Create Event</span>
                        </NavLink>
                        <NavLink exact to="/guests" activeClassName="active" className="icon-link-menu" onClick={handleNavLinkClick}>
                            <i className="fa-solid fa-person"></i> <span className="text-menu">Guests</span>
                        </NavLink>
                        <NavLink exact to="/guests/create" activeClassName="active" className="icon-link-menu" onClick={handleNavLinkClick}>
                            <i className="fa-solid fa-person-circle-plus"></i> <span className="text-menu">Add Guest</span>
                        </NavLink>
                        <button onClick={logOutUser} className="icon-logout-menu mt-5">
                            <i className="fa-solid fa-power-off"></i> <span className='text-menu'>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="side-menu-button">
                <button onClick={toggleMenu}>
                    <i className={`fa-solid ${isOpen ? 'fa-angles-left' : 'fa-angles-right'}`}></i>
                </button>
            </div>
        </>
    );
};

export default OffcanvasComponent;