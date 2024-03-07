import { Link } from 'react-router-dom';


const ExpandedMenuBar = () => {
    return (
        <div className="expanded-menu-bar">
            <div className="menu-section">
                <Link to="/">Home</Link>

            </div>
            <div className="menu-section">
                <Link to="/events">Events</Link>
                <Link to="/events/create">Create Event</Link>
            </div>
            <div className="menu-section">
                <Link to="/guests">Guests</Link>
                <Link to="/guests/create">Create Guest</Link>
            </div>
        </div>
    );
};

export default ExpandedMenuBar;