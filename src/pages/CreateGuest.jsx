import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateGuest(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const { eventId } = props;

    const requestBody = { name, description, imageUrl, eventId };

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

  return (
    <div
      className="CreateGuest;
"
    >
      <h3>Add New Guest</h3>

      <form onSubmit={handleSubmit}>
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

        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
}

export default CreateGuest;
