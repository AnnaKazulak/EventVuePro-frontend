import { useState } from 'react';
import PropTypes from 'prop-types';
import './button.css';

const SideMenuButton = ({ onToggleMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen); // Toggle menu state
      onToggleMenu(!isOpen); // Notify parent component about menu state change
    };
  
    return (
      <div className={`side-menu-button ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleMenu}>
          <i className={`fa-solid ${isOpen ? 'fa-angles-left' : 'fa-angles-right'}`}></i>
        </button>
      </div>
    );
  };
  
  SideMenuButton.propTypes = {
    onToggleMenu: PropTypes.func.isRequired
  };
  export default SideMenuButton;
