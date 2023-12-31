import { Link,NavLink } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log("isLoggedIn", isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EventVuePro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link " to="/guests">
                Guests
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link " to="/events">
                Events
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create
              </a>
              <ul className="dropdown-menu">
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/guests/create"
                >
                  new Guest
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  aria-current="page"
                  to="/events/create"
                >
                  new Event
                </NavLink>
              </ul>
            </li>
          </ul>
          <div className="col d-flex justify-content-end align-items-center gap-3">
            {isLoggedIn && (
              <>
                <span>Hallo {user && user.name}</span>
                <NavLink to="/events">
                  <button  className="btn btn-secondary">My Events</button>
                </NavLink>
                <button  className="btn btn-danger" onClick={logOutUser}>Logout</button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to="/auth/signup">
                  {" "}
                  <button className="btn btn-primary">Sign Up</button>{" "}
                </NavLink>
                <NavLink to="/auth/login">
                  {" "}
                  <button className="btn btn-success">Login</button>{" "}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
