import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuestForm from './GuestForm';
import PropTypes from 'prop-types';

const GuestFormContainer = ({ guestId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [validationErrors, setValidationErrors] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing guest data only if guestId is present
        if (guestId) {
            const storedToken = localStorage.getItem("authToken");

            axios
                .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    const existingGuest = response.data;
                    setName(existingGuest.name);
                    setDescription(existingGuest.description);
                    setImageUrl(existingGuest.imageUrl);
                    setEmail(existingGuest.email);
                    setWhatsappNumber(existingGuest.whatsappNumber)
                    setIsEditing(true); 
                })
                .catch((error) => console.log(error));
        }
    }, [guestId]);

    const uploadImage = (file) => {
        return axios
            .post(`${import.meta.env.VITE_API_URL}/api/upload`, file)
            .then((res) => res.data)
            .catch((e) => console.log('Error uploading img ', e));
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('imageType', 'mainImage');
        uploadData.append('imageUrl', e.target.files[0]);
        setImageLoading(true);

        uploadImage(uploadData)
            .then((response) => {
                setImageUrl(response.fileUrl);
            })
            .catch((err) => console.log('Error while uploading the file: ', err))
            .finally(() => {
                setImageLoading(false);
            });
    };

    const validateForm = () => {
        const errors = [];
        if (!name.trim()) {
            errors.push('Name is required');
        }
        if (!email.trim()) {
            errors.push('Email is required');
        } else if (!emailRegex.test(email)) {
            errors.push('Enter email in correct email format');
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        const storedToken = localStorage.getItem('authToken');

        const requestBody = {
            name,
            email,
            whatsappNumber,
            description,
            imageUrl,
        };

        const apiEndpoint = guestId
            ? `${import.meta.env.VITE_API_URL}/api/guests/${guestId}`
            : `${import.meta.env.VITE_API_URL}/api/guests`;

        const requestMethod = guestId ? 'PUT' : 'POST';

        axios
            .request({
                method: requestMethod,
                url: apiEndpoint,
                data: requestBody,
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setName('');
                setDescription('');
                setImageUrl('');
                setEmail('');
                setWhatsappNumber('');
                navigate('/guests');
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <GuestForm
                name={name}
                email={email}
                whatsappNumber={whatsappNumber}
                description={description}
                imageUrl={imageUrl}
                imageLoading={imageLoading}
                handleFileUpload={handleFileUpload}
                setName={setName}
                setEmail={setEmail}
                setWhatsappNumber={setWhatsappNumber}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                validationErrors={validationErrors}
                isEditing={isEditing}
            />
        </>
    );
};

GuestFormContainer.propTypes = {
    guestId: PropTypes.string,
};

export default GuestFormContainer;