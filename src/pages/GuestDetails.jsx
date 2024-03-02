import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EntityDetails from '../components/EntityDetails ';

function GuestDetails() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setGuest(response.data))
      .catch((error) => console.log(error));
  }, [guestId]);

  const deleteGuest = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/guests");
      })
      .catch((err) => console.log(err));
  };

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section mt-5">
      <EntityDetails
        imageUrl={guest.imageUrl}
        name={guest.name}
        title=""
        locationLabel=""
        location=""
        dateLabel=""
        date=""
        descriptionLabel="Description"
        description={guest.description}
        editLink={`/guests/edit/${guestId}`}
        deleteEvent={deleteGuest}
        cancelLink={`/guests`}
      />
    </section>
  );
}

export default GuestDetails;