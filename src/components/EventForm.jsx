import GalleryPreview from "../components/GalleryPreview";
import PropTypes from 'prop-types';
import { formatDateShort } from '../utils/dateUtils';
import { useState, useEffect } from "react";


const EventForm = ({
    title,
    description,
    location,
    initialDate,
    time,
    imageUrl,
    guests,
    guestList,
    validationErrors,
    imageLoading,
    galleryImages,
    handleFileUpload,
    handleGalleryFileUpload,
    setTitle,
    setDescription,
    setLocation,
    setDate,
    setTime,
    setGuests,
    handleSubmit,
}) => {
    const [formattedDate, setFormattedDate] = useState(formatDateShort(initialDate, 'YYYY.MM.DD')); // Use initialDate

    useEffect(() => {
        // Update formattedDate whenever initialDate changes
        setFormattedDate(formatDateShort(initialDate));
    }, [initialDate]);

    console.log("formattedDate", formattedDate)

    return (
        <form className="center-form">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                    <span className="text-danger">*</span>
                </label>
                {validationErrors && (
                    <div className="alert alert-danger" role="alert">
                        {validationErrors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                    <span className="text-danger">*</span>
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">
                    Location
                    {/* <span className="text-danger">*</span> */}
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

            </div>

            <div className="mb-3">
                <label htmlFor="date" className="form-label me-3">
                    Date
                    {/* <span className="text-danger">*</span> */}
                </label>
                <span className="fw-bold">{formattedDate}</span>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    placeholder="date"
                    name="date"
                    value={formattedDate}
                    onChange={(e) => {
                        const newDate = e.target.value;
                        setFormattedDate(newDate);
                        setDate(newDate);
                    }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="time" className="form-label">
                    Time
                    {/* <span className="text-danger">*</span> */}
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="time"
                    placeholder="time"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>

            {/* {{#if errorMessage}}
      <p className="error text-danger">{{errorMessage}}</p>
    {{/if}} */}

            <div className="mb-3">
                <label htmlFor="guests" className="form-label">
                    Guests
                    <select
                        name="guests"
                        className="form-select select-custom custom-select"
                        multiple
                        value={guests}
                        onChange={(e) =>
                            setGuests((prev) =>
                                prev.includes(e.target.value)
                                    ? prev.filter((current) => current !== e.target.value)
                                    : [...prev, e.target.value]
                            )
                        }
                    >
                        {guestList.map((guest) => (
                            <option key={guest._id} value={guest._id}>
                                {guest.name}
                            </option>
                        ))}
                    </select>
                </label>
                <div id="multiSelectHelp" className="form-text">
                    At least one guest must be selected
                </div>
            </div>


            {/* Main Image Preview */}
            {imageUrl && (
                <div className="mb-3">
                    <img
                        src={imageUrl}
                        alt="Main Event"
                        style={{ maxWidth: '200px', height: 'auto' }}
                    />
                </div>
            )}

            {/* Main Image Input */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Main Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="main-image"
                    onChange={(e) => handleFileUpload(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="galleryImages" className="form-label">
                    Gallery Images
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="galleryImages"
                    name="gallery-images"
                    multiple
                    onChange={(e) => handleGalleryFileUpload(e)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-success mb-5 me-5"
                onClick={handleSubmit}
                disabled={imageLoading}
            >
                {imageLoading ? "Loading Image..." : "Add Event"}
            </button>
            <a
                className="btn btn-outline-success mb-5"
                role="button"
                href="/guests"
            >
                Cancel
            </a>

            <GalleryPreview images={galleryImages} />
        </form>
    );
};

EventForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    initialDate: PropTypes.string,
    time: PropTypes.string,
    imageUrl: PropTypes.string,
    guests: PropTypes.array,
    galleryImages: PropTypes.array,
    mapCenter: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    onFileUpload: PropTypes.func,
    onGalleryFileUpload: PropTypes.func,
    onSubmit: PropTypes.func,
    guestList: PropTypes.array,
    validationErrors: PropTypes.object,
    imageLoading: PropTypes.bool,
    handleFileUpload: PropTypes.func,
    handleGalleryFileUpload: PropTypes.func,
    handleMapClick: PropTypes.func,
    setTitle: PropTypes.func,
    setDescription: PropTypes.func,
    setLocation: PropTypes.func,
    setDate: PropTypes.func,
    setTime: PropTypes.func,
    setGuests: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default EventForm;
