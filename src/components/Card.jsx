import PropTypes from 'prop-types';

const Card = ({ imageSrc, title, invitedGuests, attendingGuests, eventDate }) => {

    return (
        <div className="card">
            <img src={imageSrc} alt={title} className="card-image" />
       
            <div className="card-text">
            <p className="card-title">{title}</p>
                <div className="card-info">
                    <div className="info">
                        <div className='card-info-number'>{invitedGuests}</div>
                        <div className='card-info-text'>Invited</div>
                    </div>
                    <div className="info">
                        <div className='card-info-number'>{attendingGuests}</div>
                        <div className='card-info-text'>Attending</div>
                    </div>
                    {/* <div className="info">
                        <div className='card-info-number'>{eventDate}</div>
                        <div className='card-info-text'>When</div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    invitedGuests: PropTypes.number.isRequired,
    attendingGuests: PropTypes.number.isRequired,
    eventDate: PropTypes.string
};

export default Card;
