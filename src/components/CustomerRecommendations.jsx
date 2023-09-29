function CustomerRecommendations() {
  return (
    <div className="customer-recommendations">
      <h4>What Our Customers Say</h4>
      <div className="col-12  ">
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>
                "EventVuePro has truly transformed the way I plan events.
                Effortless event creation, organized guest lists, and no more
                paper chaos. I'm never looking back! Join the future of event
                planning with EventVuePro today."
              </p>
              <footer className="blockquote-footer">
                <span className="me-2">Johanna</span>{" "}
                <cite title="Source Title">Axa Insurance</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="card mt-5">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>
                "EventVuePro is a game-changer for event planning. If you're
                tired of the endless paper lists and juggling details, it's time
                to say hello to effortless event creation. Join us and make your
                gatherings smarter and stress-free!"
              </p>
              <footer className="blockquote-footer">
                <span className="me-2">Agnes</span>{" "}
                <cite title="Source Title">Ikea Germany</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRecommendations;
