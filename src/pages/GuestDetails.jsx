import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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

  if (!guest) {
    return <div>Loading...</div>;
  }

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

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={guest.imageUrl}
              alt={guest.name}
              className="img-fluid shadow-lg mb-5 bg-body rounded custom-img-details"
            />
          </div>
          <div className="col-md-6">
            <p className="fs-3">{guest.name}</p>
            <p>{guest.description}</p>
            <div className="mt-5">
              <button className="btn btn-secondary me-5">
                {" "}
                <Link
                  to={`/guests/edit/${guestId}`}
                  className="text-white custom-btn-text"
                >
                  {" "}
                  Edit Guest
                </Link>
              </button>
              <button className="btn btn-danger me-5" onClick={deleteGuest}>
                Delete Guest
              </button>

              <a
                className="btn btn-outline-success "
                role="button"
                href={`/guests`}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestDetails;
