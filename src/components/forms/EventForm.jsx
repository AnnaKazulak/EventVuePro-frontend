import GalleryPreview from "../gallery/GalleryPreview";
import PropTypes from 'prop-types';
import { formatDateShort } from '../../utils/dateUtils';
import { useState, useEffect } from "react";
import './event-form.css';


const EventForm = ({
    title,
    description,
    location,
    date,
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
    isEditing,
    deleteImage,
    deleteGalleryImage

}) => {
    const [formattedDate, setFormattedDate] = useState(formatDateShort(date, 'yyyy-MM-dd')); // Use initialDate

    useEffect(() => {
        setFormattedDate(formatDateShort(date));
    }, [date]);

    return (
        <>
            <div className="event-form-container my-5">
                <form className="event-form " onSubmit={handleSubmit}>
                    <div className="mb-3">
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
                            placeholder="title&#42;"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="description"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
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
                        <div className="mb-3 main-image-container"                         >
                            <img
                                src={imageUrl}
                                alt="Main Event"
                                className="main-image" />
                            <button
                                className="btn btn-danger btn-sm delete-button-main-image"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteImage();
                                }}
                            >
                                Delete Image
                            </button>
                        </div>
                    )}

                    {/* Gallery Image Input */}
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
                        className="btn btn-success me-5"
                        type="submit"
                        disabled={imageLoading}
                    >
                        {imageLoading ? "Uploading Image..." : (isEditing ? "Submit Changes" : "Add Event")}
                    </button>
                    <a
                        className="btn btn-cancel"
                        role="button"
                        href="/events"
                    >
                        Cancel
                    </a>

                    <GalleryPreview
                        images={galleryImages}
                        deleteGalleryImage={deleteGalleryImage}
                        showDeleteButton={true}
                        showSlideshowControls={false}
                    />

                </form>
            </div>
        </>

    );
};

EventForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
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
    deleteImage: PropTypes.func,
    deleteGalleryImage: PropTypes.func,
    isEditing: PropTypes.bool,
    showSlideshowControls: PropTypes.bool
};

export default EventForm;
