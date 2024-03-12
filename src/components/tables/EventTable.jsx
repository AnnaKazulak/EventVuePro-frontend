import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateShort } from '../../utils/dateUtils';
import Pagination from '../pagination/Pagination';

const EventTable = ({ title, events, deleteEvent }) => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedEvents.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    console.log("handlePageChange clicked pagination");
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    console.log("Current Page:", pageNumber); // Add this line to log the updated currentPage
  };


  return (
    <>
      <h4>{title}</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" style={{ width: "60%" }} className="pointer" onClick={() => sortEvents('title')}>
              <span className='text-dark'>Event Title</span>   {sortConfig.key === 'title' && (
                <i className={`fas fa-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
              )}
            </th>
            <th scope="col" style={{ width: "30%" }} className="pointer" onClick={() => sortEvents('date')}>
              Date {sortConfig.key === 'date' && (
                <i className={`fas fa-caret-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
              )}
            </th>
            <th scope="col" style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((event) => (
            <tr key={event._id}>
              <td>
                <Link to={`/events/${event._id}`} className="event-link">
                  <span className='text-dark fw-lighter'>{event.title}</span>
                </Link>
              </td>
              <td>
                <Link to={`/events/${event._id}`} className="event-link">
                  <span className='text-dark fw-lighter'>{formatDateShort(event.date)}</span>
                </Link>

              </td>
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
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange} />
    </>
  );
}

EventTable.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

export default EventTable;