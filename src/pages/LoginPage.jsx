import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    console.log(requestBody);

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);

        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container custom-container mt-5">
      <form onSubmit={handleLoginSubmit} className="center-form">
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

        <p>You'll be redirected to the homepage</p>

        <button type="submit" className="btn btn-success mb-3">
          Log in
        </button>
      </form>
      <p>Don't have an account yet?</p>
      <button className="btn btn-primary">
        {" "}
        <Link to={"/auth/signup"} className="text-white custom-btn-text">
          {" "}
          Sign Up
        </Link>
      </button>
    </div>
  );
}

export default LoginPage;
