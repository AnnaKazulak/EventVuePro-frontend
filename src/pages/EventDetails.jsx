import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";
import { formatDateShort } from "../utils/dateUtils";
import EmailForm from "../components/EmailForm";
import ClickableList from "../components/ClickableList";
import EntityDetails from "../components/EntityDetails ";
import Accordion from "./Accordion";
import DeleteModal from "../components/DeleteModal";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [guestResponses, setGuestResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

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

  const deleteEvent = () => {
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
    <section className="section mt-5">
      <EntityDetails
        imageUrl={event.imageUrl}
        name={event.name}
        title={event.title}
        locationLabel="Location"
        location={event.location}
        dateLabel="Date"
        date={formatDateShort(event.date)}
        descriptionLabel="Description"
        description={event.description}
      />

      {/* buttons */}
      <div className="row mx-4 mb-3">
        <div className="col-md-12 d-flex flex-column flex-md-row justify-content-md-start">
          <button className="btn btn-secondary me-md-3 mb-2 mb-md-0">
            <Link to={`/events/edit/${eventId}`} className="text-white custom-btn-text">
              Edit
            </Link>
          </button>
          <button className="btn btn-danger me-md-3 mb-2 mb-md-0" onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
          <a className="btn btn-outline-success mb-2 mb-md-0" role="button" href={`/events`}>
            Cancel
          </a>
        </div>
      </div>

      <div className="row mx-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <Accordion id="guestListAccordion" title="Guest's List">
            <ClickableList
              items={event.guests}
              baseUrl="/guests"
              linkKey="_id"
              guestResponses={guestResponses}
              columnNames={['Name', 'Attending']}
            />
          </Accordion>
        </div>

        <div className="col-md-6">
          <Accordion id="emailAccordion" title="Open Email Form">
            <EmailForm guests={event.guests} eventId={eventId} />
          </Accordion>
        </div>
      </div>
      <div className="row mx-4">
        <GalleryPreview images={event.gallery.map(image => image.galleryImageUrl)} />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        itemName={event.title}
        show={showDeleteModal}
        onDelete={deleteEvent}
        onClose={() => setShowDeleteModal(false)}
      />
    </section>
  );
}

export default EventDetails;