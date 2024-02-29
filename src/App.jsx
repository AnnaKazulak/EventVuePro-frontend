import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import GuestList from "./pages/GuestList";
import EventList from "./pages/EventList";
import CreateGuest from "./pages/CreateGuest";
import CreateEvent from "./pages/CreateEvent";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import GuestDetails from "./pages/GuestDetails";
import EditGuest from "./pages/EditGuest";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import CollapsedMenuBar from "./components/CollapsedMenuBar";
import ExpandedMenuBar from "./components/ExpandedMenuBar";

function App() {
  const [imageDimensions, setImageDimensions] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const updateImageDimensions = (imageUrl, width, height) => {
    setImageDimensions(prev =>
    ({
      ...prev,
      [imageUrl]: { width, height }
    })
    );
  };

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/guests`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        // Process the response and extract image dimensions
        const guests = response.data;
        // Update image dimensions based on the response data
        guests.forEach((guest) => {
          const { imageUrl, imageWidth, imageHeight } = guest;
          updateImageDimensions(imageUrl, imageWidth, imageHeight);
        });
      } catch (error) {
        console.error("Error fetching guest data:", error);
      }
    };

    fetchGuests();
  }, []);


  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="App">

      {isLoggedIn && (
        <>
          <CollapsedMenuBar onExpand={handleToggleExpand} isExpanded={isExpanded} />
          {isExpanded && <ExpandedMenuBar />}
        </>
      )}
      <div className="Content">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/guests"
            element={
              <IsPrivate>
                <GuestList imageDimensions={imageDimensions} />
              </IsPrivate>
            }
          />
          <Route
            path="/guests/create"
            element={
              <IsPrivate>
                <CreateGuest updateImageDimensions={updateImageDimensions} />
              </IsPrivate>
            }
          />
          <Route
            path="/guests/:guestId"
            element={
              <IsPrivate>
                <GuestDetails />
              </IsPrivate>
            }
          />
          <Route
            path="/guests/edit/:guestId"
            element={<EditGuest updateImageDimensions={updateImageDimensions} />}
          />

          <Route
            path="/events"
            element={
              <IsPrivate>
                <EventList />
              </IsPrivate>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <IsPrivate>
                <EventDetails />
              </IsPrivate>
            }
          />

          <Route path="/events/edit/:eventId" element={
            <EditEvent />
          } />

          <Route
            path="/events/create"
            element={
              <IsPrivate>

                <CreateEvent />

              </IsPrivate>
            }
          />

          <Route
            path="/auth/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/auth/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
