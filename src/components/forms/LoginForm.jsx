import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './login-form.css';

const LoginForm = ({ onSubmit, onResendVerification, isSignup, errorMessage, isEmailVerified }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            data-testid="name-input-login-form"
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
                        data-testid="email-input-login-form"
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
                        data-testid="password-input-login-form"
                    />
                    <label data-testid="show-password-label-login-form">
                        <input type="checkbox" onChange={togglePasswordVisibility} /> Show Password
                    </label>
                    <div id="passwordHelp" className="form-text">
                        <p>All fields are required</p>
                        <p>Password must be longer than 6 characters</p>
                    </div>
                </div>

                {isSignup && (
                    <p className="text-muted" data-testid="signup-info-login-form">Check your email for verification after signing up.</p>
                )}

                <div className="button-group">
                    <button type="submit" className="btn btn-primary" data-testid="submit-button-login-form">
                        {isSignup ? "Sign Up" : "Log in"}
                    </button>
                    {!isSignup && (
                        <button className="btn btn-primary" data-testid="signup-button-login-form">
                            <Link to="/auth/signup" className="text-white">Sign Up</Link>
                        </button>
                    )}
                </div>
                {errorMessage && <p className="text-danger" data-testid="error-message-login-form">{errorMessage}</p>}
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
