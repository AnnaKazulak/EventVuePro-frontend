import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditGuest(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const { guestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/guests/${guestId}`)
      .then((response) => {
        const oneGuest = response.data;
        setName(oneGuest.name);
        setDescription(oneGuest.description);
        setCurrentImageUrl(oneGuest.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [guestId]);

  const uploadImage = (file) => {
    return axios
      .post(`${API_URL}/api/upload`, file)
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

    const requestBody = { name, description, imageUrl };

    axios
      .put(`${API_URL}/api/guests/${guestId}`, requestBody)
      .then((response) => {
        navigate(`/guests/${guestId}`);
      });
  };

  const deleteGuest = () => {
    axios
      .delete(`${API_URL}/api/guests/${guestId}`)
      .then(() => {
        navigate("/guests");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditGuest">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Edit Image:</label>
        {currentImageUrl && (
          <div>
            <img src={currentImageUrl} alt="Current Image" />
          </div>
        )}
        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button onClick={handleFormSubmit}>Submit</button>
        <button onClick={deleteGuest}>Delete Guest</button>
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
