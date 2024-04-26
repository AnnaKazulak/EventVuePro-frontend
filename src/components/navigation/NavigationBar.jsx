import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import "./navigation.css";

const NavigationBar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} data-testid="navbar-navigationsBar">
      <div className="container">
        <div className="navbar-brand" data-testid="navbar-brand-navigationsBar">
          <Link to="/" data-testid="logo-link-navigationsBar">
            <span>EventVuePro</span>
            <img src="/balooon-1-removebg.png" alt="logo baloon" className='img-logo' data-testid="logo-img-navigationsBar" />
          </Link>
        </div>
        <button
          className={`mr-1 navbar-toggler ${isMobileNavOpen ? 'open' : ''}`}
          onClick={toggleMobileNav}
          data-testid="mobile-nav-toggler-navigationsBar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-links ${isMobileNavOpen ? 'open' : ''}`} data-testid="navbar-links-navigationsBar">
          <ul>
            {isLoggedIn ? (
              <>
                <li className='mt-1'>
                  <NavLink to="/auth/user-page" data-testid="user-page-link-navigationsBar">Hallo {user && user.name}</NavLink>
                </li>
                <li>
                  <button onClick={logOutUser} className="icon-logout-menu" data-testid="logout-button-navigationsBar">
                    <i className="fa-solid fa-power-off"></i> <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/auth/signup" data-testid="signup-link-navigationsBar">SignUp</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/login" data-testid="login-link-navigationsBar">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;