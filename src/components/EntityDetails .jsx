import PropTypes from 'prop-types';

const EntityDetails = ({
    imageUrl,
    name,
    title,
    locationLabel,
    location,
    dateLabel,
    date,
    descriptionLabel,
    description,
}) => {

    return (
        <div className="container-wrapper">
            <div className="container" >
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="img-fluid shadow-lg mb-5 bg-body rounded custom-img-details"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h3 className=" mb-4">{title}</h3>
                            </div>
                            <div className="col-md-12">
                                <h3 className=" mb-4">{name}</h3>
                            </div>
                            <div className="col-md-12">
                                <p><strong>{descriptionLabel}</strong> {description}</p>
                            </div>
                            <div className="col-md-12">
                                <p><strong>{dateLabel}</strong> {date}</p>
                            </div>
                            <div className="col-md-12">
                                <p><strong>{locationLabel}</strong> {location}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

EntityDetails.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    locationLabel: PropTypes.string,
    location: PropTypes.string,
    dateLabel: PropTypes.string,
    date: PropTypes.string,
    descriptionLabel: PropTypes.string,
    description: PropTypes.string,
};

export default EntityDetails;
