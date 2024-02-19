import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ClickableList({ items, baseUrl, linkKey }) {
  const [sortBy, setSortBy] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    const sortOrder = sortAsc ? 1 : -1;
    if (sortBy === "name") {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
    } else {
      return (a[sortBy] - b[sortBy]) * sortOrder;
    }
  });

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortBy === "name" && (
                sortAsc ? <i className="fa-solid fa-sort-up" /> : <i className="fa-solid fa-sort-down" />
              )}
            </th>
            <th onClick={() => handleSort("attending")}>
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
                  style={{ textDecoration: "none" }}
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.attending ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ClickableList.propTypes = {
    items: PropTypes.array,
    baseUrl: PropTypes.string, 
    linkKey: PropTypes.string
}

export default ClickableList;