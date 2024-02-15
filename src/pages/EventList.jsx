import { useState, useEffect } from "react";
import axios from "axios";
import { formatDateShort } from '../utils/dateUtils';
import PageHeader from "../components/PageHeader";
import EventTable from "../components/EventTable";

function EventList() {
    const [events, setEvents] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);

    const getAllEvents = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/events`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const eventsData = response.data;

                // Format the date for each event
                const formattedEvents = eventsData.map(event => {
                    const formattedEventDate = formatDateShort(event.date);
                    return { ...event, formattedDate: formattedEventDate };
                });

                // Update state with formatted events
                setEvents(formattedEvents);
                setFilteredEvents(formattedEvents);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllEvents();
    }, []);

    useEffect(() => {
        // Filter the event list based on the search input
        const filtered = events.filter((event) =>
            event.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredEvents(filtered);
    }, [searchInput, events]);

    const deleteEvent = async (eventId) => {
        try {
            const storedToken = localStorage.getItem("authToken");
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            // Refresh the events list after deletion
            getAllEvents();
        } catch (error) {
            console.log(error);
        }
    };
    const currentDate = new Date();

    const upcomingEvents = filteredEvents.filter(
        (event) => new Date(event.date) > currentDate
    );

    const pastEvents = filteredEvents.filter(
        (event) => new Date(event.date) <= currentDate
    );

    return (
        <div className="container mt-5">

            <PageHeader
                title="All my Events"
                itemCount={filteredEvents.length}
                searchInput={searchInput}
                handleSearchInput={(e) => setSearchInput(e.target.value)}
            />

            <EventTable title="Upcoming Events" events={upcomingEvents} deleteEvent={deleteEvent} />
            <EventTable title="Past Events" events={pastEvents} deleteEvent={deleteEvent} />

        </div>
    );
}

export default EventList;


