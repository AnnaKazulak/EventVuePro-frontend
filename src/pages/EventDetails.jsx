
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";
import { formatDateShort } from "../utils/dateUtils";
import EmailForm from "../components/EmailForm";
import ClickableList from "../components/ClickableList";
import EntityDetails from "../components/EntityDetails ";
import Accordion from "./Accordion";


function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [guestResponses, setGuestResponses] = useState({});
  const [loading, setLoading] = useState(true);
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
        editLink={`/events/edit/${eventId}`}
        deleteEvent={deleteEvent}
        cancelLink={`/events`}
      />

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

    </section>
  );

}

export default EventDetails;