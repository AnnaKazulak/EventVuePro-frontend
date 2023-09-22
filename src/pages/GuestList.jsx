import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function GuestList() {
  const [guests, setGuests] = useState([]);

  const getAllGuests = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/guests`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setGuests(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGuests();
  }, []);
  
  return (
    <div>
      <h1>This is the GuestList Page</h1>
      {guests.map((guest) => {
      return  <p key={guest._id}>{guest.name}</p>;
      })}
    </div>
  );
}

export default GuestList;
