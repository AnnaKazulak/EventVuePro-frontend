import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Hero from "../components/headers/Hero";
import Button from "../components/buttons/Button";

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

      <section className="section bg-baby-blue text-white d-flex">
        <div className="container-fluid h-90">
          <div className="row h-100">
            <div className="col-md-6">
              <div className="d-flex justify-content-center mt-5">
                <h1 className="hero-hello mt-5">Let us have fun together!</h1>
              </div>

              {isLoggedIn && (
                <div className="d-flex justify-content-center">
                  <div className="button-container">
                    <Button label="Guests" to="/guests" className="btn btn-info m-3 " />
                    <Button label="Create Guest" to="/guests/create" className="btn btn-info  m-3" />
                    <Button label="Events" to="/events" className="btn btn-warning m-3 " />
                    <Button label="Create Event" to="/events/create" className="btn btn-warning m-3 " />
                  </div>
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
              <img src="/ania_geraete2.png" alt="Image" className="section-image img-fluid" />
            </div>

            {/* Left half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
              <div className="left-content">
                <p className="fs-4 text-dark">
                  Discover <span className="fw-bold">EventVuePro</span>, my creation exploring full stack web development.
                  It&apos;s a responsive web app, easily accessible on adaptable.io for backend and
                  Netlify for frontend - both free platforms. You can check out the complete
                  code on my <span className="text-pink">GitHub</span>. I&apos;m constantly improving it, adding new features and
                  fixing bugs. Created entirely by me, it&apos;s a project I&apos;m proud of. Dive in
                  and explore the journey behind this amazing application with me!
                </p>
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
                <p className="fs-4 text-dark "> Welcome to my application! As a guest,
                  you&apos;re welcome to explore the homepage. To unlock the full experience,
                  sign up by clicking the 
                  <Link to="/auth/signup">
                    <button className="btn btn-primary mx-2">Sign Up</button>
                  </Link> button. Upon sign-up, a verification email
                  will be sent to you. Once you&apos;ve verified your account, you&apos;ll gain access
                  to the app&apos;s features and content. Let&apos;s embark on this journey together
                  - sign up now and begin exploring!</p>
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
              <img src="/dancing-people-removebg.png" alt="Image" className="section-image img-fluid" />
            </div>

            {/* Right half */}
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="left-content">
                <p className="fs-4 text-dark">Once you&apos;ve successfully 
                logged into <span className="fw-bold">EventVuePro</span>, an array of exciting features 
                awaits! Create guests and events effortlessly, then seamlessly 
                organize them for your perfect gathering. Track email invitations 
                and RSVPs to stay updated on your guests&apos; responses. Enjoy the 
                convenience of a fully responsive application, accessible on any 
                device. I&apos;m continually enhancing and adding new features to ensure 
                an optimal user experience. Join me on this journey of improvement 
                as we elevate event management to new heights with Event Vue Pro!</p>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="button-container">
                  <Button label="Guests" to="/guests" className="btn btn-info m-3 " />
                  <Button label="Create Guest" to="/guests/create" className="btn btn-info  m-3" />
                  <Button label="Events" to="/events" className="btn btn-warning m-3 " />
                  <Button label="Create Event" to="/events/create" className="btn btn-warning m-3 " />
                </div>
              </div>
            ) : (
              <>
                <div className="btn-text-container">
                  <h1 className="hero-hello mb-3">Join us today!</h1>
                  <div className="d-flex justify-content-center">
                    <Link to="/auth/signup">
                      <button className="btn btn-primary me-2">Sign Up</button>
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