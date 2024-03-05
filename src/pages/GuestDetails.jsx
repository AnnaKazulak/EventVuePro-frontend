import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import EntityDetails from '../components/EntityDetails ';
import DeleteModal from '../components/DeleteModal';

function GuestDetails() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        // title=""
        // locationLabel=""
        // location=""
        // dateLabel=""
        // date=""
        descriptionLabel="Description"
        description={guest.description}
      />

      <div className="row mx-4">
        <div className="col-md-12">
          <button className="btn btn-secondary me-md-3 mb-2 mb-md-0">
            <Link to={`/guests/edit/${guestId}`} className="text-white custom-btn-text">
              Edit
            </Link>
          </button>
          <button className="btn btn-danger me-md-3" onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
          <a className="btn btn-outline-success mb-2 mb-md-0" role="button" href={`/guests`}>
            Cancel
          </a>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteModal
        itemName={guest.name}
        show={showDeleteModal}
        onDelete={deleteGuest}
        onClose={() => setShowDeleteModal(false)}
      />
    </section>
  );
}

export default GuestDetails;