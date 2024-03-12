import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import LoginForm from '../../components/forms/LoginForm';
import axios from 'axios';

function LoginPage() {

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleLoginSubmit = (formData) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, formData)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription)
        console.log("errorMessage", errorMessage)
        console.error('Login failed:', error);
      });
  };

  return (
    <section className='bg-very-light-grey'>
      <div className="container custom-container mt-5 position-relative">
        <LoginForm onSubmit={handleLoginSubmit} />
        {errorMessage &&
          <div className="alert alert-danger position-absolute start-50 translate-middle-x alert-custom" >
            {errorMessage}
          </div>
        }
      </div>
    </section >

  );
}

export default LoginPage;