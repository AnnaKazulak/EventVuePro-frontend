
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, isSignup, errorMessage }) => {
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

                <div className="button-group">
                    <button type="submit" className="btn btn-success">
                        {isSignup ? "Sign Up" : "Log in"}
                    </button>
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
    isSignup: PropTypes.bool,
    errorMessage: PropTypes.string
};

export default LoginForm;