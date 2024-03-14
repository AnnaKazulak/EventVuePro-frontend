import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import GuestList from "./pages/guests/GuestList";
import EventList from "./pages/events/EventList";
import CreateGuest from "./pages/guests/CreateGuest";
import CreateEvent from "./pages/events/CreateEvent";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import IsPrivate from "./components/others/IsPrivate";
import IsAnon from "./components/others/IsAnon";
import GuestDetails from "./pages/guests/GuestDetails";
import EditGuest from "./pages/guests/EditGuest";
import EventDetails from "./pages/events/EventDetails";
import EditEvent from "./pages/events/EditEvent";
import Footer from "./components/footer/Footer";
import NavigationBar from "./components/navigation/NavigationBar";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/buttons/ScrollToTopButton";
import CollapsibleMenu from "./components/menus/CollapsibleMenu";
import SideMenuButton from "./components/buttons/SideMenuButton";
import OffcanvasComponent from "./components/OffcanvasComponent";

function App() {
  const [imageDimensions, setImageDimensions] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

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
    <div className={isLoggedIn ? "App Content" : "App"}>
      {isLoggedIn && isSmallScreen && <SideMenuButton />}
      {isLoggedIn && isSmallScreen && <OffcanvasComponent />}
      {isLoggedIn && (
        <>
          <CollapsibleMenu
            onExpand={handleToggleExpand}
            isExpanded={isExpanded}
          />
        </>
      )}

      <NavigationBar />
      <div className="page-container">
        <div className="main-content">
          <ScrollToTop />
          <ScrollToTopButton />
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

            <Route path="/events/edit/:eventId" element={<EditEvent />} />

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
        </div>
        <Footer />
      </div>
    </div>
  );

}

export default App;
