import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EventList() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);
  
  return (
    <div>
      <h1>This is the EventList Page</h1>
      {events.map((event) => {
      return  <p key={event._id}>{event.title}</p>;
      })}
    </div>
  );
}

export default EventList;
