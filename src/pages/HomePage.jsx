import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Hero from "../components/headers/Hero";
import Button from "../components/buttons/Button";
import Card from "../components/cards/Card";
import data from "../assets/data.json";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { events } = data;

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
      <section className="section bg-baby-blue text-white d-flex">
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
              <img src="/dancing-party-group-removebg.png" alt="Image" className="section-image" />
            </div>

          </div>
        </div>
      </section>
      {/* Section FOR THE CARDS */}
      <section className="section bg-very-light-grey d-flex">
        <div className="container-fluid h-90">
          <div className="row h-100">

            {/* Right half with image */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">

              {events.map((event, index) => (
                <Card
                  key={index}
                  imageSrc={event.image}
                  title={event.title}
                  invitedGuests={event.invitedGuests}
                  attendingGuests={event.attendingGuests}
                // eventDate={event.date}
                />
              ))}

            </div>
            {/* Left half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
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

      {/* Section #4 */}
      <section className="section bg-info text-white">
        <div className="container-fluid h-90">
          <div className="row h-100">

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

            {/* Left half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src="/jump_people_right_2.png" alt="Image" className="section-image" />
            </div>

          </div>
        </div>
      </section>

      {/* Section #5 */}
      <section className="section bg-very-light-grey">
        <div className="container-fluid h-90 mt-5">
          <div className="row h-100">
            {/* Left half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src="/dancing-people-removebg.png" alt="Image" className="section-image" />
            </div>

            {/* Right half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="left-content">
                <p className="fs-4 text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem aperiam,
                  eaque ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                  ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="d-flex justify-content-center mt-5">
                <Button label="Guests" to="/guests" className="btn btn-info m-3 " />
                <Button label="Create Guest" to="/guests/create" className="btn btn-info  m-3" />
                <Button label="Events" to="/events" className="btn btn-warning m-3 " />
                <Button label="Create Event" to="/events/create" className="btn btn-warning m-3 " />
              </div>
            ) : (
              <>
                <div className="btn-text-container">
                  <h1 className="hero-hello mb-3">Join us today!</h1>
                  <div className="d-flex justify-content-center">
                    <Link to="/auth/signup">
                      <button className="btn btn-primary">Sign Up</button>
                    </Link>
                    <span className="btn-spacing"></span>
                    <Link to="/auth/login">
                      <button className="btn btn-success">Login</button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;