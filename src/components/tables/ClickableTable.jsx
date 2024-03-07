import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from "react";

function ClickableTable({ items, baseUrl, linkKey, guestResponses }) {

    const [sortBy, setSortBy] = useState("name");
    const [sortAsc, setSortAsc] = useState(true);

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(key);
            // Reset sort order to ascending when changing columns
            setSortAsc(true);
        }
    };

    const sortedItems = [...items].sort((a, b) => {
        const sortOrder = sortAsc ? 1 : -1;
        if (sortBy === "name") {
            return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
        } else if (sortBy === "attending") {
            // Extract attending status
            const attendingA = guestResponses[a.email] || ''; // Default to an empty string if attending info is missing
            const attendingB = guestResponses[b.email] || ''; // Default to an empty string if attending info is missing

            // Handle sorting for attending status
            if (attendingA === attendingB) {
                // If attending status is the same, sort by name
                return a["name"].localeCompare(b["name"]) * sortOrder;
            } else if (attendingA === "attending") {
                // Sort attending before not attending
                return -1 * sortOrder;
            } else {
                // Sort not attending after attending
                return 1 * sortOrder;
            }
        } else {
            // Default to numeric comparison for other columns
            return (a[sortBy] - b[sortBy]) * sortOrder;
        }
    });


    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")} className='col-name'>
                            Name{" "}
                            {sortBy === "name" && (
                                sortAsc ? <i className="fa-solid fa-sort-up" /> : <i className="fa-solid fa-sort-down" />
                            )}
                        </th>
                        <th onClick={() => handleSort("attending")} className='col-attending'>
                            Attending{" "}
                            {sortBy === "attending" && (
                                sortAsc ? <i className="fa-solid fa-sort-up" /> : <i className="fa-solid fa-sort-down" />
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <Link
                                    to={`${baseUrl}/${item[linkKey]}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {item.name}
                                </Link>
                            </td>
                            <td>{guestResponses[item[linkKey]] ? guestResponses[item[linkKey]] : "Not invaited yet"}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

ClickableTable.propTypes = {
    items: PropTypes.array,
    baseUrl: PropTypes.string,
    linkKey: PropTypes.string,
    guestResponses: PropTypes.object,
};

export default ClickableTable;