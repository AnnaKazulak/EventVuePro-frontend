import { useState } from "react";
import PropTypes from "prop-types";

const GalleryPreview = ({ images }) => {
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
                        <img
                            key={index}
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="gallery-image mx-1"
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
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

//  PropTypes validation
GalleryPreview.propTypes = {
    images: PropTypes.array.isRequired,
};

export default GalleryPreview;
