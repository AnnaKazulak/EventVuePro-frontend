import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setEvent(response.data))
      .catch((error) => console.log(error));
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const deleteEvent = (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
      .then(() => {
        navigate("/events");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="img-fluid shadow-lg mb-5 bg-body rounded custom-img-details"
            />
          </div>
          <div className="col-md-6">
            <h5 className="card-title mb-5">{event.title}</h5>
            <p className="card-text">{event.description}</p>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Guest's List
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {event.guests.map((guest) => {
                      return (
                        <div key={guest._id}>
                          <Link
                            to={`/guests/${guest._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {guest.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button className="btn btn-secondary me-5">
                {" "}
                <Link
                  to={`/events/edit/${eventId}`}
                  className="text-white custom-btn-text"
                >
                  {" "}
                  Edit Event
                </Link>
              </button>
              <button className="btn btn-danger me-5" onClick={deleteEvent}>
                Delete Event
              </button>
              <button className="btn btn-warning me-5" onClick={() => { console.log("Add photos clicked") }}>
                Add Photos
              </button>
              <a
                className="btn btn-outline-success "
                role="button"
                href={`/events`}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
        {event.gallery.length > 0 && (
          <div className="mb-3">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {event.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.galleryImageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '200px', marginRight: '10px', marginBottom: '10px' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EventDetails;
