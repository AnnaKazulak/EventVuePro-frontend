import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    editLink,
    deleteEvent,
    cancelLink
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
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <h5 className="card-title">{title}</h5>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <p><strong>{locationLabel}</strong> {location}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <p><strong>{dateLabel}</strong> {date}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <p><strong>{descriptionLabel}</strong> {description}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <button className="btn btn-secondary me-md-3 mb-2 mb-md-0">
                                        <Link to={editLink} className="text-white custom-btn-text">
                                            Edit
                                        </Link>
                                    </button>
                                    <button className="btn btn-danger me-md-3 mb-2 mb-md-0" onClick={deleteEvent}>
                                        Delete
                                    </button>
                                    <a className="btn btn-outline-success mb-2 mb-md-0" role="button" href={cancelLink}>
                                        Cancel
                                    </a>
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
    editLink: PropTypes.string,
    deleteEvent: PropTypes.func,
    cancelLink: PropTypes.string
};

export default EntityDetails;
