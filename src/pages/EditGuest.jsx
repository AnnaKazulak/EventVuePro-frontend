import { useParams } from "react-router-dom";
import GuestFormContainer from "../components/GuestFormContainer";


const EditGuest = () => {
  const { guestId } = useParams();

  return (
    <>
      <div className="container custom-container mt-5">
        <h2>Edit Guest</h2>
        {guestId ? (
          <GuestFormContainer guestId={guestId} />
        ) : (
          <p>Error: Guest ID not provided</p>
        )}
      </div>
    </>
  );
}

export default EditGuest;
