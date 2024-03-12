import PropTypes from "prop-types";
import ListItem from "../lists/ListItem";
import Pagination from "../pagination/Pagination";
import { useState } from 'react';


const SortableTable = ({ items, sortedColumn, sortDirection, sortCallback }) => {

    const pageSize = 10; // Define the number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Function to handle column sorting
    const sortItems = (column) => {
        let newSortDirection = 'asc'; // Default to ascending order if not sorted
        if (column === sortedColumn) {
            // If the same column is clicked again, toggle the sort direction
            newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // If a different column is clicked, default to descending order
            newSortDirection = 'desc';
        }
        // Sort the items based on the column and direction
        const sortedItems = [...items].sort((a, b) => {
            if (column === "name") {
                if (newSortDirection === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            } else {
                return 0;
            }
        });
        // Call the parent component's callback function with the sorted items
        // and sorting parameters
        sortCallback(sortedItems, column, newSortDirection);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(items.length / pageSize);

    // Calculate the index of the first and last item to display on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, items.length);

    // Get the items to display on the current page
    const currentItems = items.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    };


    return (
        <>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col" onClick={() => sortItems("name")} className="pointer">
                            Name{" "}
                            {sortedColumn === "name" && (
                                <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : sortDirection === 'desc' ? 'down' : ''}`}></i>
                            )}
                        </th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <ListItem key={item._id} data={item} basePath="/guests" />
                    ))}
                </tbody>
            </table>
            {/* Render Pagination component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

SortableTable.propTypes = {
    items: PropTypes.array.isRequired,
    sortedColumn: PropTypes.string,
    sortDirection: PropTypes.oneOf(['asc', 'desc', 'none']).isRequired,
    sortCallback: PropTypes.func.isRequired
};

export default SortableTable;
