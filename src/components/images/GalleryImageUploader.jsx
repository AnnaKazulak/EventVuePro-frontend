import PropTypes from 'prop-types';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

const GalleryImageUploader = ({ handleGalleryFileUpload }) => {
    const handleMultipleFileDrop = (droppedFiles) => {
        handleGalleryFileUpload(droppedFiles); // Handle multiple file upload for the gallery
    };

    return (
        <div className="mb-3">
            <label htmlFor="galleryImages" className="form-label">
                <span className="click-to-select">Click to select image</span>
            </label>
            <DragAndDrop handleDrop={handleMultipleFileDrop}>
                <span className="drag-n-drop">Drag &apos;n&apos; drop image here</span>
            </DragAndDrop>
            <input
                type="file"
                className="form-control"
                id="galleryImages"
                name="gallery-images"
                style={{ display: 'none' }}
                multiple
                onChange={(e) => handleMultipleFileDrop(e.target.files)}
            />
        </div>
    );
};

GalleryImageUploader.propTypes = {
    handleGalleryFileUpload: PropTypes.func.isRequired,
};

export default GalleryImageUploader;
