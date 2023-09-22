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
    <div className="container">
      <h1>This is the GuestList Page</h1>
      <h4>your guets list contains {guests.length} members</h4>

      {guests.map((guest, index) => {
        return (
          <div key={guest._id}>
            <ol className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold "> <span className="pe-4">{index + 1}</span>{guest.name}</div>
                  <div className="ps-5">
                  {guest.description}
                  </div>
                </div>
                <div>
                  <img src={guest.imageUrl} alt="" className="custom-img" />
                </div>
              </li>
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default GuestList;
