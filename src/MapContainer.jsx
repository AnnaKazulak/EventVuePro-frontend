import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MapContainer = ({ children }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Event listener for script load
    script.addEventListener("load", () => {
      setScriptLoaded(true);
    });

    // Event listener for script error
    script.addEventListener("error", () => {
      console.error("Error loading Google Maps API script.");
    });

    document.head.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!scriptLoaded) {
    // Return loading state or placeholder if needed
    return <div>Loading map...</div>;
  }

  return <>{children}</>;
};

MapContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapContainer;





