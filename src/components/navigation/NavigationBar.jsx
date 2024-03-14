import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context";
import "./navigation.css"


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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <span>EventVuePro</span>
            <img src="/balooon-1-removebg.png" alt="logo baloon" className='img-logo' />
          </Link>
        </div>
        <button
          className={`mr-1 navbar-toggler ${isMobileNavOpen ? 'open' : ''}`}
          onClick={toggleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-links ${isMobileNavOpen ? 'open' : ''}`}>
          <ul>
            {isLoggedIn ? (

              <>
                <li className='mt-1'>
                  Hallo {user && user.name}
                </li>
                <li>
                  <button onClick={logOutUser} className="icon-logout-menu">
                    <i className="fa-solid fa-power-off"></i> <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/auth/signup">SignUp</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/login">Login</NavLink>
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
