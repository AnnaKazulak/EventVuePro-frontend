import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function CreateGuest({ updateImageDimensions }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const navigate = useNavigate();

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
        console.log("response", response);
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

  const handleSubmit = (e) => {
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
      .post(`${import.meta.env.VITE_API_URL}/api/guests`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setName("");
        setDescription("");
        setImageUrl("");
        navigate("/guests");
        // to do
        // Invoke the callback function coming through the props
        // from the EventDetailsPage, to refresh the event details --> does not exist yet
        // props.refreshProject();
      })
      .catch((error) => console.log(error));
  };

  const isAddGuestButtonDisabled = imageUploading;

  return (
    <>
      <div className="container custom-container mt-5">
        <h3>Add New Guest</h3>
        <form className="center-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
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
            <input
              className="btn btn-secondary me-5"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>

          <button
            className="btn btn-success me-5 mb-5"
            type="submit"
            disabled={isAddGuestButtonDisabled}
          >
            {imageUploading ? "Uploading Image..." : "Add Guest"}
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

export default CreateGuest;
