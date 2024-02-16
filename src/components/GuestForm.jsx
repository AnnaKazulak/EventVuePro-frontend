import PropTypes from 'prop-types';
import { useState } from 'react';

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
    validationErrors
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

    return (
        <>
            <div className="container custom-container mt-5">
                <form className="center-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {validationErrors && validationErrors.includes('Name is required') && (
                            <div className="alert alert-danger" role="alert">
                                Name is required
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            name="email"
                            value={email}
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
                        <label htmlFor="whatsappNumber" className="form-label">
                            WhatsappNumber
                            <span className="text-danger">*</span>
                        </label>
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
                        <label htmlFor="description" className="form-label">
                            Description
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
                    <button
                        className="btn btn-success me-5 mb-5"
                        type="submit"
                        disabled={imageLoading}
                    >
                        {imageLoading ? "Uploading Image..." : "Add Guest"}
                    </button>
                    <a
                        className="btn btn-outline-success mb-5"
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
    validationErrors: PropTypes.array
};

export default GuestForm;
