import GuestFormContainer from "../components/GuestFormContainer";

function CreateGuest() {


  return (
    <>
      <div className="container mt-5 row">
        <div className="col-md-1 "></div>
        <div className="col-md-2 mt-3">
          <h2>Create Guest</h2>
        </div>
        <div className="col-md-8">
          <GuestFormContainer />
        </div>
      </div>
    </>
  );
}

export default CreateGuest;

