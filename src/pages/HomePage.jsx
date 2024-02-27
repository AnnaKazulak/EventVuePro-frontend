import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Hero from "../components/Hero";
import Button from "../components/Button";


function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <div >
        <Hero
          isLoggedIn={isLoggedIn}
          userName={user && user.name}
          onLogout={logOutUser}
        />

      </div>
      {/* Section #2 */}
      <section className="section bg-dark text-white">
        <div className="container-fluid h-90">
          <div className="row h-100">
            <div className="col-md-6">

              <div className="d-flex justify-content-center mt-5">
                <h1 className="hero-hello mt-5">Let us heaving fun together!</h1>
              </div>

              {isLoggedIn && (
                <div className="d-flex justify-content-center">
                  <Button label="Guests" to="/guests" className="btn btn-info m-3 " />
                  <Button label="Create Guest" to="/guests/create" className="btn btn-info  m-3" />
                  <Button label="Events" to="/events" className="btn btn-warning m-3 " />
                  <Button label="Create Event" to="/events/create" className="btn btn-warning m-3 " />
                </div>
              )}
            </div>
            {/* Right half with image */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src="/celebration-party.png" alt="Image" className="section-image" />
            </div>

          </div>
        </div>
      </section>

      {/* Section #3 */}
      <section className="section bg-very-light-blue text-white">
        <div className="container-fluid h-90">
          <div className="row h-100">
            {/* Left half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src="/jump_people_right_2.png" alt="Image" className="section-image" />
            </div>

            {/* Right half with image */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="left-content">
                <p className="fs-4 text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem aperiam,
                  eaque ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;