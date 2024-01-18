import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";


function GuestList({ imageDimensions }) {
  const [guests, setGuests] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [index, setIndex] = useState(-1);

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
          { filteredGuests && filteredGuests.map((guest, index) => {
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
        <>
          <PhotoAlbum
            photos={filteredGuests.map((guest) => {
              return  {
              src: guest.imageUrl,
              width: imageDimensions[guest.imageUrl].width,
              height: imageDimensions[guest.imageUrl].height,
            }
             
            })}
            layout="rows"
            targetRowHeight={150}
            onClick={({ index }) => setIndex(index)}
          />
          <span>Hallo</span>

          <Lightbox
            slides={filteredGuests.map((guest) => ({
              src: guest.imageUrl,
              width: 800,
              height: 600,
            }))}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </>
      )}
    </div>
  );
}

export default GuestList;
