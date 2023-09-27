import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className=" container mt-5">
      <div className="row">
        <div className="col-6">
          <p>🌟 Join the Future of Event Planning with EventVuePro! 🌟</p>
          <p>
            Tired of juggling endless guest lists and event details on paper?
            We've got you covered! Introducing EventVuePro, your ultimate event
            planning companio
          </p>
          <p>
            <p>🎉 What's in it for you? 🎉</p>
            <p> 📅 Effortless Event Creation: Design your event in a snap!</p>
            {/* <p>
              {" "}
              📩 Seamless Guest Management: Easily invite and track your guests.
            </p>
            <p>
              🤝 Real-time Connections: Keep everyone in the loop effortlessly.
            </p> */}
            Say goodbye to the chaos of event planning. Say hello to
            EventVuePro. It's time to plan your gatherings the smart way. Join
            us now! 💃🕺 Get Started: 
            <div>
                <Link to="/auth/signup">
                  {" "}
                  <button className="btn btn-primary">Sign Up</button>{" "}
                </Link>
                <Link to="/auth/login">
                  {" "}
                  <button className="btn btn-success">Login</button>{" "}
                </Link>
              </div>🚀
          </p>
        </div>
        <div className="col-6"> Col2</div>
      </div>
    </div>
  );
}

export default HomePage;
