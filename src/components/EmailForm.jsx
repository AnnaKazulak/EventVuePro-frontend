import { useState } from 'react';
import axios from 'axios';


const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/emails`, {
        email: email,
        message: message
      });
      console.log(response.data);
      setLoading(false);
      setError('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Error sending email. Please try again.');
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(`/api/emails?email=${email}`);
  //     console.log(response.data);
  //     setLoading(false);
  //     setError('');
  //     setEmail('');
  //     setMessage('');
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     setError('Error sending email. Please try again.');
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h3 className="card-title">Send Email</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Recipient Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
