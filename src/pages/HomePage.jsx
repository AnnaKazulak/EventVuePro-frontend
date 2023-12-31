import { Link } from "react-router-dom";
import CustomerRecommendations from "../components/CustomerRecommendations";

function HomePage() {
  return (
    <div className="container mt-5 mb-5">
      <div className="hero">
        <div className="container-hero"></div>
        <div className="hero-content">
          <h1>Welcome to EventVuePro</h1>
          <p>Your Ultimate Event Planning Companion</p>
          <Link to="/auth/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
          <Link to="/auth/login">
            <button className="btn btn-success">Login</button>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col text-center">
          <h2>Join the Future of Event Planning with EventVuePro!</h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-6 order-2 order-md-1">
          <p className="">
            Are you tired of the stress and disorganization that comes with
            planning events? Imagine a world where you can effortlessly create
            and manage your events, all in one convenient place. With
            EventVuePro, that world is now a reality.
          </p>
          <p>
            <i className="fa-solid fa-champagne-glasses me-2"></i>
            <span> What's in it for you?</span>
          </p>
          <p>
            <i className="fa-regular fa-calendar-check me-2"></i>
            <span>
              {" "}
              Effortless Event Creation: Design your event in a snap!
            </span>
          </p>
          <p>
            {" "}
            <i className="fa-solid fa-xmark me-2"></i>Say goodbye to the chaos
            of event planning.
          </p>
          <p>
            <i className="fa-solid fa-check me-2"></i>Say hello to{" "}
            <span className="fs-4">EventVuePro.</span>
          </p>
          <p>
            {" "}
            EventVuePro is here to make your life easier and your events
            unforgettable. It's time to plan your gatherings the smart way. Join
            us now and experience the future of event planning. Get started with
            EventVuePro and take the first step towards stress-free, seamless
            event organization. Your next event is just a click away! :
          </p>
          <div>
            <Link to="/auth/signup">
              <button className="btn btn-primary me-3">Sign Up</button>
            </Link>
            <Link to="/auth/login">
              <button className="btn btn-success">Login</button>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 order-1 order-md-2">
          <CustomerRecommendations />
          {/* <img
            src="src/assets/baloons.jpg"
            className="img-fluid custom-img-main" // Apply the custom class
            alt="..."
          ></img> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
