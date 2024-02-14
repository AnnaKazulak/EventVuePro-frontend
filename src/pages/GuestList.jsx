
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("list"); // Track active tab

  const [searchInput, setSearchInput] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('none');

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

  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setViewMode(tab);
  };

  // Function to handle column sorting
  const sortGuests = (column) => {
    let newSortDirection = 'asc'; // Default to ascending order if not sorted
    if (column === sortedColumn) {
      // If the same column is clicked again, cycle through sort directions
      newSortDirection = sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? 'none' : 'asc';
    }
    setSortedColumn(column);
    setSortDirection(newSortDirection);
  };

  // Function to determine sorting order
  const sortedGuests = [...filteredGuests].sort((a, b) => {
    if (sortedColumn === "name") {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortDirection === 'desc') {
        return b.name.localeCompare(a.name);
      } else {
        // No sorting
        return 0;
      }
    } else {
      return 0;
    }
  });

  return (
    <div className="container mt-5">
      <h1>All my guests</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <h4>Your guest list contains {filteredGuests.length} members</h4>
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

      {/* Nav tabs */}
      <ul className="nav nav-tabs mb-5">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "list" && "active"}`}
            aria-current="page"
            href="#"
            onClick={() => handleTabClick("list")}
          >
            Guest List
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" && "active"}`}
            href="#"
            onClick={() => handleTabClick("details")}
          >
            Guest Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "gallery" && "active"}`}
            href="#"
            onClick={() => handleTabClick("gallery")}
          >
            Guest Gallery
          </a>
        </li>
      </ul>

      {/* Render list view */}
      {viewMode === "list" && (
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col"  onClick={() => sortGuests("name")} className="pointer">
                  Name{" "}
                  {sortedColumn === "name" && (
                    <i
                      className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : sortDirection === 'desc' ? 'down' : ''}`}
                    ></i>
                  )}
                </th>
                <th scope="col">Email</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {sortedGuests.map((guest) => (
                <tr key={guest._id}>
                  <td>
                    <Link
                      to={`/guests/${guest._id}`}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-dark d-flex align-items-center"
                    >
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          overflow: "hidden",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src={guest.imageUrl}
                          alt=""
                          className="rounded-circle"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/guests/${guest._id}`}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-dark d-flex align-items-center"
                    >
                      {guest.name}
                    </Link>
                  </td>
                  <td>{guest.email}</td>
                  <td>
                    <Link
                      to={`/guests/edit/${guest._id}`}
                      className="event-link me-4"
                    >
                      <i className="fas fa-pencil-alt icon-link"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render details view */}
      {viewMode === "details" && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredGuests.map((guest) => (
            <div key={guest._id} className="col">
              <Link to={`/guests/${guest._id}`} style={{ textDecoration: "none" }}>
                <div className="card h-100 shadow guest-card">
                  <img
                    src={guest.imageUrl}
                    className="card-img-top"
                    alt={guest.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{guest.name}</h5>
                    <p className="card-text">{guest.email}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Render gallery view */}
      {viewMode === "gallery" && (
        <GalleryPreview images={filteredGuests.map((guest) => guest.imageUrl)} />
      )}
    </div>
  );
}

export default GuestList;