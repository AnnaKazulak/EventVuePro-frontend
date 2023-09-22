import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function CreateGuest(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const { eventId } = props;

    const requestBody = { name, description, eventId };

    axios
      .post(`${API_URL}/api/guests`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setName("");
        setDescription("");
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
      <h3>Add New Task</h3>

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

        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
}

export default CreateGuest;
