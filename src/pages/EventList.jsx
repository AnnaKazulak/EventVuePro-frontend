import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getAllEvents = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    // Filter the event list based on the search input
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchInput, events]);

  const deleteEvent = async (eventId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      // Refresh the events list after deletion
      getAllEvents();
    } catch (error) {
      console.log(error);
    }
  };
  const currentDate = new Date();

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) > currentDate
  );

  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.date) <= currentDate
  );

  return (
    <div className="container mt-5">
      <h1>All my Events</h1>
      <div className="col-md-6">
        <input
          type="search"
          placeholder="Search by event title"
          className="form-control mb-3"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <h2>Upcoming Events</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "60%" }}>Event Name</th>
            <th scope="col" style={{ width: "20%" }}>Date</th>
            <th scope="col" style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr key={event._id}>
              <td>
                <Link to={`/events/${event._id}`} className="event-link">
                  {event.title}
                </Link>
              </td>
              <td>{event.date}</td>
              <td>
                <Link
                  to={`/events/edit/${event._id}`}
                  className="event-link me-4"
                >
                  <i className="fas fa-pencil-alt icon-link"></i>
                </Link>
                <span className="event-link" onClick={() => deleteEvent(event._id)}>
                  <i className="fas fa-trash-alt icon-link"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Past Events</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "60%" }}>Event Name</th>
            <th scope="col" style={{ width: "20%" }}>Date</th>
            <th scope="col" style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event, index) => (
            <tr key={event._id}>
              <td>
                <Link to={`/events/${event._id}`} className="event-link">
                  {event.title}
                </Link>
              </td>
              <td>{event.date}</td>
              <td>
                <Link
                  to={`/events/edit/${event._id}`}
                  className="event-link me-4"
                >
                  <i className="fas fa-pencil-alt icon-link"></i>
                </Link>
                <span className="event-link" onClick={() => deleteEvent(event._id)}>
                  <i className="fas fa-trash-alt icon-link"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;


