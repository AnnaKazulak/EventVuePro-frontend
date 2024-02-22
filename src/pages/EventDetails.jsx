import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";
import { formatDateShort } from "../utils/dateUtils";
import EmailForm from "../components/EmailForm";
import ClickableList from "../components/ClickableList"


function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [guestResponses, setGuestResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/guest-responses`
      )
      .then((response) => {
        const responsesMap = {};
        response.data.forEach((item) => {
          responsesMap[item.invitedGuest] = item.rsvpResponse;
        });
        setGuestResponses(responsesMap);
      })
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <p className="card-text">{event.location}</p>
            <p className="card-text">{formatDateShort(event.date)}</p>
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
                    Guest&apos;s List
                  </button>
                </h2>

                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ClickableList
                      items={event.guests}
                      baseUrl="/guests"
                      linkKey="_id"
                      guestResponses={guestResponses}
                      columnNames={['Name', 'Attending']}
                    />

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
        <div className="accordion mt-5" id="emailAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEmailForm">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEmailForm"
                aria-expanded="false"
                aria-controls="collapseEmailForm"
              >
                Open Email Form
              </button>
            </h2>
            <div
              id="collapseEmailForm"
              className="accordion-collapse collapse"
              aria-labelledby="headingEmailForm"
              data-bs-parent="#emailAccordion"
            >
              <div className="accordion-body">
                <EmailForm guests={event.guests} eventId={eventId} />
              </div>
            </div>
          </div>
        </div>
        <GalleryPreview images={event.gallery.map(image => image.galleryImageUrl)} />

      </div>
    </>
  );
}

export default EventDetails;