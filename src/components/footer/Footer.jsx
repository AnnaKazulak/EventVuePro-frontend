import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Footer() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <footer className="footer">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Event Vue Pro</h5>
                            <p>
                                Event Vue Pro is a leading event management software, streamlining the organization and coordination of events with ease. From seamless guest list management to efficient event planning tools,
                                we empower businesses and individuals to create memorable experiences effortlessly.
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link className="navbar-brand" to="/">
                                        <p className="mb-3">Home</p>
                                    </Link>
                                    {isLoggedIn && (
                                        <>
                                            <Link className="navbar-brand " to="/events">
                                                <p >My Events</p>
                                            </Link>
                                            <Link className="navbar-brand" to="/guests">
                                                <p >My Guest</p>
                                            </Link>
                                        </>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-3">Follow Us</h5>
                            <div className="social-icons">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3">
                    © {new Date().getFullYear()} Event Vue Pro
                </div>
            </footer>
        </div>


    );
}

export default Footer;
