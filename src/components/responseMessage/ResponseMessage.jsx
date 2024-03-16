import PropTypes from 'prop-types';

const ResponseMessage = ({ response }) => {
    return (
        <section className="section bg-light text-dark mx-3">
            <div className="message" style={{ color: response === 'Yes' ? 'green' : 'orange' }}>
                {response === 'Yes' ? (
                    <>
                        <div className="hero-section section text-white collapsed-padding ">
                            <div className="container-fluid h-90 mt-5">
                                <div className="row h-100">
                                    {/* Left half */}
                                    <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
                                        <img src="/party_people-removebg.png" alt="Party People" className="party-image" />
                                    </div>
                                    {/* Right half */}
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="hero-content text-center">
                                            <>
                                                <h1 className="hero-hello">
                                                    Thank you for <span className="fw-bolder text-pink"> confirming
                                                    </span> your attendance! </h1>
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="hero-section section text-white collapsed-padding ">
                            <div className="container-fluid h-90 mt-5">
                                <div className="row h-100">
                                    {/* Left half */}
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="hero-content text-center">
                                            <>
                                                <h1 className="hero-hello">
                                                    Thank you for your answer! </h1>
                                                <h3 className="hero-hello">In case you change your mind, let us know!</h3>
                                            </>
                                        </div>
                                    </div>
                                    {/* Right half */}
                                    <div className="col-md-6 d-flex align-items-center justify-content-center mt-5">
                                        <img src="/jumping_people_no_background.png" alt="Party People" className="party-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </section>

    );
};

ResponseMessage.propTypes = {
    response: PropTypes.oneOf(['Yes', 'No']).isRequired
};

export default ResponseMessage;
