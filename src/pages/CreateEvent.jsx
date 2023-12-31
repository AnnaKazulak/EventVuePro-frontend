import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); 
  const [imageUrl, setImageUrl] = useState("");
  const [guests, setGuests] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [validationErrors, setValidationErrors] = useState(null);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const uploadImage = (file) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/api/upload`, file)
      .then((res) => res.data)
      .catch((e) => console.log("Error uploading img ", e));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGuestList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guests: ", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
console.log("hallo clg")
    const requestBody = {
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      guests,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setTime("");
        setImageUrl("");
        setGuests([]);
        navigate("/events");
        // to do
        // Invoke the callback function coming through the props
        // from the EventDetailsPage, to refresh the event details --> does not exist yet
        // props.refreshProject();
      })
      .catch((error) => {
        // Check if the error is a validation error
        if (error.response && error.response.status === 400) {
          // Display the validation error message
          setValidationErrors(error.response.data.error);
        } else {
          // Handle other errors
          console.log(error);
        }
      });
  };
  useEffect(() => {
    console.log(guests);
  }, [guests]);
  return (
    <>
      <div className="container custom-container mt-5">
        <h2>Create an Event</h2>
        <form className="center-form">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
              <span className="text-danger">*</span>
            </label>
            {validationErrors && (
              <div className="alert alert-danger" role="alert">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
              <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
              {/* <span className="text-danger">*</span> */}
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
              {/* <span className="text-danger">*</span> */}
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time
              {/* <span className="text-danger">*</span> */}
            </label>
            <input
              type="text"
              className="form-control"
              id="time"
              placeholder="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* {{#if errorMessage}}
      <p className="error text-danger">{{errorMessage}}</p>
    {{/if}} */}
          <div className="mb-3">
            <input
              type="file"
              className="btn btn-secondary"
              id="image"
              placeholder="image"
              name="movie-cover-image"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="guests" className="form-label">
              Guests
              <select
                name="guests"
                className="form-select select-custom custom-select"
                multiple
                value={guests}
                onChange={(e) =>
                  setGuests((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((current) => current !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              >
                {guestList.map((guest) => (
                  <option key={guest._id} value={guest._id}>
                    {guest.name}
                  </option>
                ))}
              </select>
            </label>
            <div id="multiSelectHelp" className="form-text">
              At lest one guest must be selected
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success mb-5 me-5"
            onClick={handleSubmit}
          >
            Add Event
          </button>
          <a
            className="btn btn-outline-success mb-5"
            role="button"
            href="/guests"
          >
            Cancel
          </a>
        </form>
      </div>
    </>
  );
}
export default CreateEvent;
