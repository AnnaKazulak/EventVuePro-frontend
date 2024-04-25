import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageUploader from '../images/ImageUploader';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GuestForm = ({
    name,
    description,
    imageUrl,
    email,
    whatsappNumber,
    imageLoading,
    handleFileUpload,
    setName,
    setDescription,
    setEmail,
    setWhatsappNumber,
    handleSubmit,
    validationErrors,
    isEditing,
    deleteImage,

}) => {

    const [emailValidationError, setEmailValidationError] = useState(null);

    // validation function
    const validateEmail = (email) => {
        if (!email.trim()) {
            setEmailValidationError('Email is required');
        } else if (!emailRegex.test(email)) {
            setEmailValidationError('Enter email in correct email format');
        } else {
            setEmailValidationError(null);
        }
    };

    // Function to handle file drop
    const handleFileDrop = (droppedFiles) => {
        const file = droppedFiles[0];
        handleFileUpload({ target: { files: [file] } }); // Pass the dropped file as an event object
    };

    return (
        <>
            <div className="event-form-container my-5">
                <form className="event-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name&#42;"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {validationErrors && validationErrors.includes('Name is required') && (
                            <div className="alert alert-danger" role="alert">
                                Name is required
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="email&#42;"
                            name="email"
                            value={email}
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                                // Trigger validation when email input changes
                                validateEmail(e.target.value);
                            }}
                        />
                        {validationErrors && validationErrors.includes('Email is required') && (
                            <div className="alert alert-danger" role="alert">
                                Email is required
                            </div>
                        )}
                        {validationErrors && validationErrors.includes('Enter email in correct email format') && (
                            <div className="alert alert-danger" role="alert">
                                Enter email in correct email format
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="whatsappNumber"
                            placeholder="whatsappNumber"
                            name="whatsappNumber"
                            value={whatsappNumber}
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="description"
                            placeholder='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Main Image Preview */}
                    {imageUrl && (
                        <div className="mb-3 main-image-container">
                            <img
                                src={imageUrl}
                                alt="Main Event"
                                className="main-image"
                            />
                            <button
                                className="btn btn-danger btn-sm delete-button-main-image"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (deleteImage) { // Check if deleteImage exists before calling it
                                        deleteImage();
                                    }
                                }}
                            >
                                Delete Image
                            </button>
                        </div>
                    )}

                    {/* Main Image */}
                    <ImageUploader
                        imageUrl={imageUrl}
                        handleFileUpload={handleFileUpload}
                        handleFileDrop={handleFileDrop}
                        multiple={false}
                    />
                    <button
                        className="btn btn-success me-5 mb-5"
                        type="submit"
                        disabled={imageLoading}
                    >
                        {imageLoading ? "Uploading Image..." : (isEditing ? "Submit Changes" : "Add Guest")}
                    </button>
                    <a
                        className="btn btn-cancel mb-5"
                        role="button"
                        href="/guests"
                    >
                        Cancel
                    </a>
                </form>
            </div>
        </>
    );
};

GuestForm.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    email: PropTypes.string,
    whatsappNumber: PropTypes.string,
    imageUrl: PropTypes.string,
    imageLoading: PropTypes.bool,
    handleFileUpload: PropTypes.func,
    setName: PropTypes.func,
    setDescription: PropTypes.func,
    setEmail: PropTypes.func,
    setWhatsappNumber: PropTypes.func,
    handleSubmit: PropTypes.func,
    validationErrors: PropTypes.array,
    isEditing: PropTypes.bool,
    deleteImage: PropTypes.func,
};

export default GuestForm;
