import { useState } from "react";
import PropTypes from "prop-types";
import "./gallery.css"

const GalleryPreview = ({ images, deleteGalleryImage, showDeleteButton }) => {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [isLightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxIndex(null);
    };

    return (
        <>
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
                        className="lightbox-image"
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
    showDeleteButton: PropTypes.bool
};

GalleryPreview.defaultProps = {
    showDeleteButton: false // By default, don't show the delete button
};

export default GalleryPreview;