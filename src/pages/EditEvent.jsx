import { useParams } from "react-router-dom";
import EventFormContainer from "../components/EventFormContainer";


function EditEvent() {
  const { eventId } = useParams();

  return (
    <>
      <div className="container custom-container mt-5">
        {eventId ? (
          <EventFormContainer eventId={eventId} />
        ) : (
          <p>Error: Event ID not provided</p>
        )}
      </div>
    </>
  );
}

export default EditEvent;

