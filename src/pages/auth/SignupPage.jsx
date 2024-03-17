import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../../components/forms/LoginForm';

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

  // Define handleResendVerification function
  const handleResendVerification = (email) => {
    // Implement resend verification logic here
    console.log("Resending verification email to:", email);
  };

  return (
    <section className='bg-very-light-grey'>
      <div className="container custom-container mt-5">
        <LoginForm
          onSubmit={handleSignupSubmit}
          onResendVerification={handleResendVerification}
          isSignup={true}
          errorMessage={errorMessage}
        />
      </div>
    </section>
  );
}

export default SignupPage;