import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const EmailForm = ({ guests, eventId }) => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        recipients: selectedEmails,
        subject: subject,
        message: message,
        eventId: eventId
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/emails`, data);
      console.log(response.data);

      setLoading(false);
      setError('');
      setSelectedEmails([]);
      setSubject('');
      setMessage('');
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Error sending email. Please try again.');
      setLoading(false);
    }
  };



  return (
    <div className="card mt-5 border-0">
      <div className="card-body ">
        {emailSent && (
          <div className="alert alert-success mb-3">
            Email(s) sent successfully!
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="row ">
          <div className="col-md-6">
            <div className="mb-3 ">
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <label htmlFor="email" className="form-label">Recipient Emails:</label>
              <select
                id="email"
                multiple
                value={selectedEmails}
                onChange={(e) => setSelectedEmails(Array.from(e.target.selectedOptions, option => option.value))}
                className="form-control"
                required
              >
                {guests.map(guest => (
                  <option key={guest._id} value={guest.email}>{guest.email}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                rows="7"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary mt-3 me-2" disabled={loading}>
                {loading ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EmailForm.propTypes = {
  guests: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  ).isRequired,
  eventId: PropTypes.string.isRequired // Add eventId as a required prop
};

export default EmailForm;