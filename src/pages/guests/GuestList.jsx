import { useState, useEffect } from "react";
import axios from "axios";
import GalleryPreview from "../../components/gallery/GalleryPreview";
import Tabs from "../../components/tabs/Tabs";
import ListItem from "../../components/lists/ListItem";
import DetailCard from "../../components/cards/DetailCard";
import PageHeader from "../../components/headers/PageHeader";
import SortableTable from "../../components/tables/SortableTable";

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("list");

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
        const sortedGuests = [...response.data].sort((a, b) => a.name.localeCompare(b.name));
        setGuests(sortedGuests);
        // Initialize the filtered list with all guests
        setFilteredGuests(sortedGuests);
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
  const sortGuests = (sortedItems, column, direction) => {
    setFilteredGuests(sortedItems);
    setSortedColumn(column);
    setSortDirection(direction);
  };


  const guestTabs = [
    { key: "list", value: "list", label: "Guest List" },
    { key: "details", value: "details", label: "Guest Details" },
    { key: "gallery", value: "gallery", label: "Guest Gallery" }
  ];

  return (

    <section className="section bg-light  text-dark mx-3">
      <div className="row">
        <div className="col-md-1 "></div>
        <div className="col-md-10 ">
          <PageHeader
            title=""
            pageTitle="Guest"
            itemCount={filteredGuests.length}
            searchInput={searchInput}
            handleSearchInput={handleSearchInput}
          /></div>
        <div className="col-md-1 "></div>
      </div>
      <div className="row">
        <div className="col-md-1 "></div>
        <div className="col-md-10 ">
          {/* Nav tabs */}
          <Tabs activeTab={activeTab} handleTabClick={handleTabClick} tabs={guestTabs} />

          {/* Render list view */}
          {viewMode === "list" && (
            <SortableTable
              items={filteredGuests}
              sortedColumn={sortedColumn}
              sortDirection={sortDirection}
              sortCallback={sortGuests}
              renderItem={(guest) => (
                <ListItem key={guest._id} data={guest} basePath="/guests" />
              )}
            />
          )}

          {/*  Render details view */}
          {viewMode === "details" && (
            <div className="row justify-content-center">
              {filteredGuests.map((guest) => (
                <DetailCard key={guest._id} data={guest} basePath="/guests" />
              ))}

            </div>
          )}

          {/* Render gallery view */}
          {viewMode === "gallery" && (
            <GalleryPreview 
            images={filteredGuests.map((guest) => guest.imageUrl)} />
          )}

        </div>
        <div className="col-md-1 "></div>
      </div>

    </section>
  );
}

export default GuestList;