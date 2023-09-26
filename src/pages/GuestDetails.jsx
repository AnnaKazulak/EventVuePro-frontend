import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function GuestDetails() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setGuest(response.data))
      .catch((error) => console.log(error));
  }, [guestId]);

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Guest Details</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{guest.name}</h5>
              <p className="card-text">{guest.description}</p>
            </div>
          </div>
          <Link to={`/guests/edit/${guestId}`}>
            <button>Edit Guest</button>
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src={guest.imageUrl}
            alt={guest.name}
            className="img-fluid custom-img"
          />
        </div>
      </div>
    </div>
  );
}

export default GuestDetails;
