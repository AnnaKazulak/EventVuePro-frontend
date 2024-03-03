import { useParams } from "react-router-dom";
import GuestFormContainer from "../components/GuestFormContainer";


const EditGuest = () => {
  const { guestId } = useParams();

  return (
    <>
      <div className="container mt-5 row">
        <div className="col-md-1 "></div>
        <div className="col-md-2 mt-3">
        </div>
        <div className="col-md-8">
          {guestId ? (
            <GuestFormContainer guestId={guestId} />
          ) : (
            <p>Error: Guest ID not provided</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EditGuest;
