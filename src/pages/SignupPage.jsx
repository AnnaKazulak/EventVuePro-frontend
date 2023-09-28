import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    console.log(requestBody);

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="container custom-container mt-5">
      <form className="center-form" onSubmit={handleSignupSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmail}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            value={password}
            onChange={handlePassword}
          />
          <div id="passwordHelp" className="form-text">
            Password must be longer than 6 characters.
          </div>
        </div>
        {errorMessage && (
          <p className="error-message text-danger">{errorMessage}</p>
        )}
        <p>you'll be redirected to the login page</p>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
