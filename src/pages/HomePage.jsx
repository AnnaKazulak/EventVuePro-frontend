import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Hero from "../components/Hero";
import Button from "../components/Button";


function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <div className="container mt-5 mb-5">
        <Hero
          isLoggedIn={isLoggedIn}
          userName={user && user.name}
          onLogout={logOutUser}
        />
        {isLoggedIn && (
          <div className="d-flex justify-content-center">
            <Button label="Guests" to="/guests" className="btn btn-info m-3 " />
            <Button label="Create Guest" to="/guests/create" className="btn btn-info  m-3" />
            <Button label="Events" to="/events" className="btn btn-warning m-3 " />
            <Button label="Create Event" to="/events/create" className="btn btn-warning m-3 " />
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
