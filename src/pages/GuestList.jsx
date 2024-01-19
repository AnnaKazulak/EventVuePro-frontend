import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";


function GuestList() {
  const [guests, setGuests] = useState([]);
  const [viewMode, setViewMode] = useState("list");

  const [searchInput, setSearchInput] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);

  const getAllGuests = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGuests(response.data);
        // Initialize the filtered list with all guests
        setFilteredGuests(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGuests();
  }, []);
  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "gallery" : "list");
  };

  // Function to handle search input changes
  const handleSearchInput = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter the guest list based on the search input
    const filtered = guests.filter((guest) =>
      guest.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredGuests(filtered);
  };

  return (
    <div className="container mt-5">
      <h1>All my guests</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <button
              onClick={toggleViewMode}
              type="button"
              className="btn btn-info mb-3"
            >
              Change to {viewMode === "list" ? "Gallery" : "List"}
            </button>
          </div>
          <div className="col-md-6">
            <input
              type="search"
              placeholder="Search by guest name"
              className="form-control mb-3"
              value={searchInput}
              onChange={handleSearchInput}
            />
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <div>
          <h4>Your guest list contains {filteredGuests.length} members</h4>
          {filteredGuests && filteredGuests.map((guest, index) => {
            return (
              <div key={guest._id}>
                <ol className="list-group custom-list-group">
                  <Link
                    to={`/guests/${guest._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fs-6 ">
                          {" "}
                          <span className="pe-4">{index + 1}.</span>
                          {guest.name}
                        </div>
                      </div>
                      <div className="custom-img-container">
                        <img
                          src={guest.imageUrl}
                          alt=""
                          className="custom-img rounded "
                        />
                      </div>
                    </li>
                  </Link>
                </ol>
              </div>
            );
          })}
        </div>
      )}
      {viewMode === "gallery" && filteredGuests && (
        <GalleryPreview images={filteredGuests.map((guest) => guest.imageUrl)} />
      )}
    </div>
  );
}

export default GuestList;
