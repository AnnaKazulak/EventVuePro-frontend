import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EditGuest({ updateImageDimensions }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const { guestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`
      , {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneGuest = response.data;
        setName(oneGuest.name);
        setDescription(oneGuest.description);
        setCurrentImageUrl(oneGuest.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [guestId]);

  const uploadImage = (file) => {
    setImageUploading(true);
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
        updateImageDimensions(
          response.fileUrl,
          response.imageWidth,
          response.imageHeight
        );
        setImageWidth(response.imageWidth);
        setImageHeight(response.imageHeight);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => setImageUploading(false));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    
    const requestBody = {
      name,
      description,
      imageUrl,
      imageWidth,
      imageHeight,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/guests/${guestId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate(`/guests/${guestId}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteGuest = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`)
      .then(() => {
        navigate("/guests");
      })
      .catch((err) => console.log(err));
  };

  const isAddGuestButtonDisabled = imageUploading;

  return (
    <div className="container custom-container mt-5">
      <h3>Edit your Guest</h3>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <button
            className="btn btn-success me-5 mb-5"
            type="submit"
            disabled={isAddGuestButtonDisabled}
          >
            {imageUploading ? "Uploading Image..." : "Save Changes"}
          </button>
        <button className="btn btn-danger me-5 mb-5" onClick={deleteGuest}>
          Delete Guest
        </button>
        <a
          className="btn btn-outline-success mb-5"
          role="button"
          href={`/guests/${guestId}`}
        >
          Cancel
        </a>
      </form>
    </div>
  );
}

export default EditGuest;
