import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './card.css';

const DetailCard = ({ data, basePath }) => {
    return (
        <div className="col mb-4">
            <Link to={`${basePath}/${data._id}`} className="guest-card-link">
                <div className="card h-100 guest-card">
                    <img
                        src={data.imageUrl}
                        className="card-img-top"
                        alt={data.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">{data.email}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

DetailCard.propTypes = {
    data: PropTypes.object.isRequired,
    basePath: PropTypes.string.isRequired,
};

export default DetailCard;
