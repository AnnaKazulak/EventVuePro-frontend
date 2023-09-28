import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const token = localStorage.getItem("authToken");
function EditEvent(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [guests, setGuests] = useState([]);
  const [guestList, setGuestList] = useState([]);

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const { eventId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
      .then((response) => {
        const oneGuest = response.data;
        setTitle(oneGuest.title);
        setDescription(oneGuest.description);
        setCurrentImageUrl(oneGuest.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, imageUrl };

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, requestBody)
      .then((response) => {
        navigate(`/events/${eventId}`);
      });
  };

  const deleteGuest = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`)
      .then(() => {
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

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
      .put(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate(`/events/${eventId}`);
      })
      .catch((error) => console.log(error));
  };

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
      <div className="container custom-container mt-5">
        <h2>Edit your Event</h2>

        <form className="center-form">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
              <span className="text-danger">*</span>
            </label>
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
          <div className="mb-3">
            {currentImageUrl && (
              <div>
                <img src={currentImageUrl} alt="Current Image" />
              </div>
            )}
            <input
              className="btn btn-secondary mt-2"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="characters" className="form-label">
              Guests
              <select
                name="characters"
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
            Save Changes
          </button>
          <button
            className="btn btn-danger me-5 mb-5"
            onClick={(e) => deleteEvent(e)}
          >
            Delete Event
          </button>
          <a
            className="btn btn-outline-success mb-5"
            role="button"
            href={`/events/${eventId}`}
          >
            Cancel
          </a>
        </form>
      </div>
    </>
  );
}

export default EditEvent;
