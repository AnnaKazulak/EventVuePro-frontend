import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";


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
            <img src="/balooon-1-removebg.png" alt="logo baloon"  className='img-logo'/>
          </Link>
        </div>
        <button
          className={`navbar-toggler ${isMobileNavOpen ? 'open' : ''}`}
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
                <li>
                  <span>Hallo {user && user.name}</span>
                </li>
                {/* <li>
                  <NavLink to="/events">My Events</NavLink>
                </li> */}
                <li>
                  <button onClick={logOutUser}>Logout</button>
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
