import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GuestForm from "./GuestForm";
import PropTypes from "prop-types";

const GuestFormContainer = ({ guestId }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const uploadImage = (file) => {
        return axios
            .post(`${import.meta.env.VITE_API_URL}/api/upload`, file)
            .then((res) => res.data)
            .catch((e) => console.log("Error uploading img ", e));
    };

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("imageType", "mainImage");
        uploadData.append("imageUrl", e.target.files[0]);

        setImageLoading(true);

        uploadImage(uploadData)
            .then((response) => {
                console.log('response mainImage', response)
                setImageUrl(response.fileUrl);
            })
            .catch((err) => console.log("Error while uploading the file: ", err))
            .finally(() => {
                setImageLoading(false);
            });
    };

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
                })
                .catch((error) => console.log(error));
        }
    }, [token, guestId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");

        const requestBody = {
            name,
            description,
            imageUrl
        };

        const apiEndpoint = guestId
            ? `${import.meta.env.VITE_API_URL}/api/guests/${guestId}`
            : `${import.meta.env.VITE_API_URL}/api/guests`;

        const requestMethod = guestId ? "PUT" : "POST";

        axios
            .request({
                method: requestMethod,
                url: apiEndpoint,
                data: requestBody,
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log("response", response);
                // Reset the state to clear the inputs
                setName("");
                setDescription("");
                setImageUrl("");
                navigate("/guests");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <GuestForm
                name={name}
                description={description}
                imageUrl={imageUrl}
                imageLoading={imageLoading}
                handleFileUpload={handleFileUpload}
                setName={setName}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
            />
        </>
    );
};


GuestFormContainer.propTypes = {
    guestId: PropTypes.string,
}
export default GuestFormContainer;

