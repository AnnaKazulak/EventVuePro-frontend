import PropTypes from "prop-types";
import ListItem from "./ListItem";

const SortableTable = ({ items, sortedColumn, sortDirection, sortCallback }) => {

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


    return (
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
                {items.map((item) => (
                    <ListItem key={item._id} data={item} basePath="/guests" />
                ))}
            </tbody>
        </table>
    );
};

SortableTable.propTypes = {
    items: PropTypes.array.isRequired,
    sortedColumn: PropTypes.string,
    sortDirection: PropTypes.oneOf(['asc', 'desc', 'none']).isRequired,
    sortCallback: PropTypes.func.isRequired
};

export default SortableTable;
