import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./gallery.css";

const GalleryPreview = ({ images, deleteGalleryImage, showDeleteButton, showSlideshowControls }) => {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    const [isSlideshowOn, setSlideshowOn] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        let slideshowTimer;
        if (isSlideshowOn) {
            slideshowTimer = setInterval(() => {
                setCurrentSlideIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000); // Change slide every 3 seconds (adjust as needed)
        } else {
            clearInterval(slideshowTimer);
        }

        return () => clearInterval(slideshowTimer);
    }, [isSlideshowOn, images]);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxIndex(null);
    };

    const toggleSlideshow = () => {
        setSlideshowOn((prevState) => !prevState);
    };

    return (
        <>
            {/* Conditionally render slideshow controls based on showSlideshowControls prop */}
            {showSlideshowControls && (
                <div className="slideshow-controls">
                    <button
                        className={`btn mt-1 btn-secondary ${isSlideshowOn ? "btn-pink" : ""}`}
                        onClick={toggleSlideshow}
                        disabled={images.length === 0}
                    >
                        {isSlideshowOn ? "Stop Slideshow" : "Start Slideshow"}
                    </button>
                </div>
            )}
            <div className="gallery-container my-5">
                <div className="gallery-images-container">
                    {images.map((image, index) => (
                        <div className="gallery-image-container" key={index}>
                            <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="gallery-image mx-1"
                                onClick={() => openLightbox(index)}
                            />
                            {showDeleteButton && (
                                <button
                                    className="btn btn-danger btn-sm delete-button-image"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteGalleryImage(index);
                                    }}
                                >
                                    Delete Image
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isLightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <img
                        src={images[lightboxIndex]}
                        alt={`Gallery Image ${lightboxIndex + 1}`}
                        className="lightbox-image with-frame"
                    />
                </div>
            )}

            {isSlideshowOn && (
                <div className="lightbox-overlay slideshow-image" onClick={toggleSlideshow}>
                    <img
                        src={images[currentSlideIndex]}
                        alt={`Slideshow Image ${currentSlideIndex + 1}`}
                        className="lightbox-image with-frame"
                    />
                </div>
            )}
        </>
    );
};

// PropTypes validation
GalleryPreview.propTypes = {
    images: PropTypes.array.isRequired,
    deleteGalleryImage: PropTypes.func,
    showDeleteButton: PropTypes.bool,
    showSlideshowControls: PropTypes.bool
};

GalleryPreview.defaultProps = {
    showDeleteButton: false, // By default, don't show the delete button
    showSlideshowControls: true, // By default, show slideshow controls
};

export default GalleryPreview;