import PropTypes from 'prop-types';
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import "./image-uploader.css"

const ImageUploader = ({ handleFileUpload, handleFileDrop }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="galleryImages" className="form-label">

                    <span onChange={(e) => handleFileUpload(e)} className="click-to-select">Click to select image</span>
                </label>
                <DragAndDrop handleDrop={handleFileDrop}>
                    <span className="drag-n-drop">Drag &apos;n&apos; drop image here</span>
                </DragAndDrop>
                <input
                    type="file"
                    className="form-control"
                    id="galleryImages"
                    name="gallery-images"
                    style={{ display: 'none' }}
                    multiple
                    onChange={(e) => handleFileUpload(e)}
                />
            </div>
        </>
    );
};

ImageUploader.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
    handleFileDrop: PropTypes.func.isRequired,
};
export default ImageUploader;
