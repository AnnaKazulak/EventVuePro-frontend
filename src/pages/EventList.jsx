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

  // Function to handle search input changes
  const handleSearchInput = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter the event list based on the search input
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="container mt-5">
      <h1>All my Events</h1>
      <div className="col-md-6">
        <input
          type="search"
          placeholder="Search by event title"
          className="form-control mb-3"
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>
      {filteredEvents.map((event, index) => {
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
