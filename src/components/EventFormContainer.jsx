import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import PropTypes from "prop-types";
import moment from 'moment';


function EventFormContainer({ eventId }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [guests, setGuests] = useState([]);
    const [guestList, setGuestList] = useState([]);
    const [validationErrors, setValidationErrors] = useState(null);


    const [imageLoading, setImageLoading] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch guests data
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/guests`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setGuestList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching guests: ", error);
            });

        // Fetch event data if in "edit" mode
        if (eventId) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const eventData = response.data;
                    setTitle(eventData.title);
                    setDescription(eventData.description);
                    setLocation(eventData.location);
                    setDate(eventData.date);
                    setTime(eventData.time);
                    setImageUrl(eventData.imageUrl);
                    setGuests(eventData.guests.map((guest) => guest._id));
                    setGalleryImages(eventData.gallery.map((image) => image.galleryImageUrl));

                })
                .catch((error) => {
                    console.error("Error fetching event data: ", error);
                });
        }
    }, [token, eventId]);

    const uploadImage = (file) => {
        return axios
            .post(`${import.meta.env.VITE_API_URL}/api/upload`, file)
            .then((res) => res.data)
            .catch((e) => console.log("Error uploading img ", e));
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();

        uploadData.append("imageType", "mainImage");
        uploadData.append("imageUrl", e.target.files[0]);

        setImageLoading(true);

        uploadImage(uploadData)
            .then((response) => {
                console.log('response mainImage', response)
                setImageUrl(response.fileUrl);
            })
            .catch((err) => console.log("Error while uploading the file: ", err))
            .finally(() => {
                setImageLoading(false);
            });
    };

    const handleGalleryFileUpload = (e) => {
        const uploadDataArray = []; // Array to store upload data for each file

        // Iterate over each file selected by the user
        Array.from(e.target.files).forEach((file) => {
            const uploadData = new FormData();

            // Append individual file data to FormData object
            uploadData.append("imageType", "galleryImage");
            uploadData.append("imageUrl", file);

            uploadDataArray.push(uploadData); // Store FormData object in array
        });

        setImageLoading(true);

        // Map over each FormData object and upload them individually
        Promise.all(uploadDataArray.map(uploadImage))
            .then((responses) => {
                // Extract file URLs from responses and update galleryImages state
                const newGalleryImages = responses.flatMap((response) => response.fileUrl);
                setGalleryImages((prevGalleryImages) => [...prevGalleryImages, ...newGalleryImages]);
            })
            .catch((err) => console.log("Error while uploading the file: ", err))
            .finally(() => {
                setImageLoading(false);
            });
    };


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/guests`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setGuestList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching guests: ", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("authToken");

        // Format the date using Moment.js before submitting the form
        // const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedDate = date ? moment(date).format('YYYY-MM-DD') : null;


        const apiEndpoint = eventId
            ? `${import.meta.env.VITE_API_URL}/api/events/${eventId}`
            : `${import.meta.env.VITE_API_URL}/api/events`;

        const requestMethod = eventId ? "PUT" : "POST";

        const requestBody = {
            title,
            description,
            date: formattedDate,
            time,
            location,
            imageUrl,
            gallery: galleryImages.map((url) => ({ galleryImageUrl: url })),
            guests,
        };

        // Check if the title field is empty
        if (!title.trim()) {
            setValidationErrors(["Event title is required"]);
            return; // Prevent further submission
        }

        axios
            .request({
                method: requestMethod,
                url: apiEndpoint,
                data: requestBody,
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log(response.data);
                // Reset the state to clear the inputs
                setTitle("");
                setDescription("");
                setLocation("");
                setDate("");
                setTime("");
                setImageUrl("");
                setGuests([]);
                setGalleryImages([]);
                navigate(`/events/${response.data._id}`);
            })
            .catch((error) => {
                // Check if the error is a validation error
                if (error.response && error.response.status === 400) {
                    const { error: backendErrors } = error.response.data;
                    // Update validationErrors state with backend errors
                    setValidationErrors(backendErrors);
                } else {
                    // Handle other errors
                    console.log(error);
                }
            });
    };


    useEffect(() => {
        console.log("guests", guests);
    }, [guests]);


    return (
        <>
            <EventForm
                title={title}
                description={description}
                location={location}
                date={date}
                time={time}
                imageUrl={imageUrl}
                guests={guests}
                guestList={guestList}
                validationErrors={validationErrors}
                imageLoading={imageLoading}
                galleryImages={galleryImages}
                handleFileUpload={handleFileUpload}
                handleGalleryFileUpload={handleGalleryFileUpload}
                setTitle={setTitle}
                setDescription={setDescription}
                setLocation={setLocation}
                setDate={setDate}
                setTime={setTime}
                setGuests={setGuests}
                handleSubmit={handleSubmit}
            />
        </>
    );
}


EventFormContainer.propTypes = {
    eventId: PropTypes.string,
}

export default EventFormContainer;