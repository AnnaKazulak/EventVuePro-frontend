import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Hero({ isLoggedIn, userName, onLogout }) {
    return (
        <div className="hero">
            <div className="container-hero"></div>
            <div className="hero-content">
                {isLoggedIn ? (
                    <>
                        <h1>Hello {userName}!</h1>
                        <button className="btn btn-danger" onClick={onLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Welcome to EventVuePro</h1>
                        <p>Your Ultimate Event Planning Companion</p>
                        <Link to="/auth/signup">
                            <button className="btn btn-primary">Sign Up</button>
                        </Link>
                        <Link to="/auth/login">
                            <button className="btn btn-success">Login</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}


Hero.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    onLogout: PropTypes.func,
};
export default Hero;


