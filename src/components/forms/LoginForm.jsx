import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './login-form.css';

const LoginForm = ({ onSubmit, onResendVerification, isSignup, errorMessage, isEmailVerified }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { email, password, name };
        onSubmit(formData);
    };

    const handleResendVerification = () => {
        onResendVerification(email);
    };


    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                {isSignup && ( // Render name field only for signup
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder='Username&#42;'
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                )}
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder='Email address&#42;'
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder='Password&#42;'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <div id="passwordHelp" className="form-text">
                        <p>All fields are required</p>
                        <p>Password must be longer than 6 characters</p>
                    </div>
                </div>

                {isSignup && (
                    <p className="text-muted">Check your email for verification after signing up.</p>
                )}

                <div className="button-group">
                    <button type="submit" className="btn btn-success"  onClick={handleResendVerification}>
                        {isSignup ? "Sign Up" : "Log in"}
                    </button>
                    {isSignup && !isEmailVerified && (
                        <button className="btn btn-secondary" onClick={handleResendVerification}>
                            Resend Verification Email
                        </button>
                    )}
                    {!isSignup && (
                        <button className="btn btn-primary">
                            <Link to="/auth/signup" className="text-white">Sign Up</Link>
                        </button>
                    )}
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onResendVerification: PropTypes.func, // Function to resend verification email
    isSignup: PropTypes.bool,
    errorMessage: PropTypes.string,
    isEmailVerified: PropTypes.bool,
};

export default LoginForm;