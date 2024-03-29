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
    validationErrors,
    isEditing

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
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
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
                            Image
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
                        {imageLoading ? "Uploading Image..." : (isEditing ? "Submit Changes" : "Add Guest")}
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
    validationErrors: PropTypes.array,
    isEditing: PropTypes.bool
};

export default GuestForm;
