import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEvent(response.data))
      .catch((error) => console.log(error));
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Event Details</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{event.title}</h5>
              <p className="card-text">{event.description}</p>
              {console.log(event)}
              {event.guests.map((guest) => {
                return (
                  <ul key={guest._id}>
                    <li>{guest.name}</li>
                  </ul>
                );
              })}
            </div>
          </div>
          <Link to={`/events/edit/${eventId}`}>
            <button>Edit Event</button>
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="img-fluid custom-img"
          />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
