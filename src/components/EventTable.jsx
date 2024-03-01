import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateShort } from '../utils/dateUtils';

const EventTable = ({ title, events, deleteEvent }) => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  useEffect(() => {
    // Sort events initially
    sortEvents(sortConfig.key);
  }, [events]);

  // Function to handle sorting
  const sortEvents = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...events].sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });

    setSortedEvents(sorted);
  };

  return (
    <>
      <h4>{title}</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "60%" }} className="pointer" onClick={() => sortEvents('title')}>
            <span className='text-dark'>Event Name</span>   {sortConfig.key === 'title' && (
                <i className={`fas fa-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
              )}
            </th>
            <th scope="col" style={{ width: "20%" }} className="pointer" onClick={() => sortEvents('date')}>
              Date {sortConfig.key === 'date' && (
                <i className={`fas fa-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
              )}
            </th>
            <th scope="col" style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event._id}>
              <td>
                <Link to={`/events/${event._id}`} className="event-link">
                 <span className='text-dark fw-lighter'>{event.title}</span> 
                </Link>
              </td>
              <td>{formatDateShort(event.date)}</td>
              <td>
                <Link
                  to={`/events/edit/${event._id}`}
                  className="event-link me-4"
                >
                  <i className="fas fa-pencil-alt icon-link"></i>
                </Link>
                <span className="event-link" onClick={() => deleteEvent(event._id)}>
                  <i className="fas fa-trash-alt icon-link"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

EventTable.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

export default EventTable;