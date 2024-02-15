import { useState, useEffect } from "react";
import axios from "axios";
import GalleryPreview from "../components/GalleryPreview";
import Tabs from "../components/Tabs";
import ListItem from "../components/ListItem";
import DetailCard from "../components/DetailCard";
import PageHeader from "../components/PageHeader";
import SortableTable from "../components/SortableTable";

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

  useEffect(() => {
    // Sort the filtered guests alphabetically only if it's not already sorted
    const sortedGuests = [...filteredGuests];
    const isSorted = sortedGuests.every((guest, index) => index === 0 || guest.name >= sortedGuests[index - 1].name);
    if (!isSorted) {
      sortedGuests.sort((a, b) => a.name.localeCompare(b.name));
      // Check if the sortedGuests array has changed
      if (JSON.stringify(sortedGuests) !== JSON.stringify(filteredGuests)) {
        setFilteredGuests(sortedGuests);
      }
    }
  }, [filteredGuests]);


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
    <div className="container mt-5">
      <PageHeader
        title="All my guests"
        itemCount={filteredGuests.length}
        searchInput={searchInput}
        handleSearchInput={handleSearchInput}
      />

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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredGuests.map((guest) => (
            <DetailCard key={guest._id} data={guest} basePath="/guests" />
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