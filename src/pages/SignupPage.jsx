import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';

function SignupPage() {

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleSignupSubmit = (formData) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className='bg-very-light-grey'>
      <div className="container custom-container mt-5">
        <Login onSubmit={handleSignupSubmit} isSignup errorMessage={errorMessage} />
        <p>You&#39;ll be redirected to the login page</p>
      </div>
    </section>

  );
}

export default SignupPage;