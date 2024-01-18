import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";


function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [guests, setGuests] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [validationErrors, setValidationErrors] = useState(null);

  const [imageLoading, setImageLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });


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

    uploadData.append("imageType", "mainImage");
    uploadData.append("imageUrl", e.target.files[0]);

    setImageLoading(true);

    uploadImage(uploadData)
      .then((response) => {
        console.log('response mainImage', response)
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setImageLoading(false);
      });
  };


  const handleGalleryFileUpload = (e) => {
    const uploadData = new FormData();

    // Use 'append' to add each file separately to the form data
    Array.from(e.target.files).forEach((file, index) => {
      console.log("🚖", file, index)
      uploadData.append("imageType", "galleryImage");
      uploadData.append("imageUrl", file);
    });

    setImageLoading(true);

    uploadImage(uploadData)
      .then((responses) => {
        // Extract file URLs from responses
        console.log("🚇Server response:", responses);
        setGalleryImages((prevGalleryImages) => [...prevGalleryImages, ...responses.fileUrl]);
        console.log("galleryImages:", galleryImages);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setImageLoading(false);
      });
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

    const requestBody = {
      title,
      description,
      date,
      time,
      location,
      imageUrl,
      gallery: galleryImages.map((url) => ({ galleryImageUrl: url })),
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


  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  }, []);

  // Handle map click event
  const handleMapClick = (event) => {
    // Update the location state with the clicked coordinates
    setLocation(`${event.latLng.lat()}, ${event.latLng.lng()}`);
  };



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
            <GoogleMap
              mapContainerStyle={{ height: "300px", width: "100%" }}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              {/* Marker for user's current location with a custom pin */}
              <Marker
                position={mapCenter}
              // icon={{
              //   url: "https://maps.google.com/mapfiles/ms/micons/blue-dot.png",
              //   scaledSize: { width: 40, height: 40 },
              // }}
              />
            </GoogleMap>
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

          {/* Main Image Preview */}
          {imageUrl && (
            <div className="mb-3">
              <img
                src={imageUrl}
                alt="Main Event"
                style={{ maxWidth: '200px', height: 'auto' }}
              />
            </div>
          )}

          {/* Main Image Input */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Main Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="main-image"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="galleryImages" className="form-label">
              Gallery Images
            </label>
            <input
              type="file"
              className="form-control"
              id="galleryImages"
              name="gallery-images"
              multiple
              onChange={(e) => handleGalleryFileUpload(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success mb-5 me-5"
            onClick={handleSubmit}
            disabled={imageLoading}
          >
            {imageLoading ? "Loading Image..." : "Add Event"}
          </button>
          <a
            className="btn btn-outline-success mb-5"
            role="button"
            href="/guests"
          >
            Cancel
          </a>

          {/* Gallery Images Preview */}
          {galleryImages.length > 0 && (
            <div className="mb-3">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {galleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    style={{ maxWidth: '100%', maxHeight: '200px', marginRight: '10px', marginBottom: '10px' }}
                  />
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
export default CreateEvent;
