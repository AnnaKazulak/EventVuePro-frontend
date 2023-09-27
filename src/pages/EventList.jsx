import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h1>All my Events</h1>

      {events.map((event, index) => {
        return (
          <div key={event._id}>
            <ol className="list-group custom-list-group">
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: "none" }}
              >
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fs-6 ">
                      {" "}
                      <span className="pe-4">{index + 1}.</span>
                      {event.title}
                    </div>
                  </div>
                  <div>
                    <img src={event.imageUrl} alt="" className="custom-img" />
                  </div>
                </li>
              </Link>
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default EventList;
