import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { formatDateLong } from '../../utils/dateUtils';

function Hero({ isLoggedIn, userName }) {
    const currentDate = formatDateLong(new Date());

    return (
        <div className="hero-section section text-white collapsed-padding ">
            <div className="container-fluid h-90 mt-5">
                <div className="row h-100">
                    {/* Left half */}
                    <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
                        <img src="/party_people-removebg.png" alt="Party People" className="party-image" />
                    </div>
                    {/* Right half */}
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="hero-content text-center">
                            {isLoggedIn ? (
                                <>
                                    <h1 className="hero-hello">Hello {userName}!</h1>
                                    <p className="hero-hello">It&apos;s {currentDate}, </p>
                                    <p className="hero-hello"> a perfect day to create a 
                                    <span className="fw-bolder text-pink"> great</span> event</p>
                                </>
                            ) : (
                                <>
                                    <h1 className="hero-hello">Welcome to EventVuePro</h1>
                                    <p className="hero-hello">Your Ultimate Event Planning Companion</p>
                                    <div className="d-flex justify-content-center">
                                        <Link to="/auth/signup">
                                            <button className="btn btn-primary me-2">Sign Up</button>
                                        </Link>
                                        <span className="btn-spacing"></span> 
                                        <Link to="/auth/login">
                                            <button className="btn btn-success">Login</button>
                                        </Link>
                                    </div>
                                </>

                            )}
                        </div>
                    </div>
                </div>
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