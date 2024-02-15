import PropTypes from "prop-types";

const PageHeader = ({ title, itemCount, searchInput, handleSearchInput }) => {
    return (
        <div>
            <h1>{title}</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h4>Your list contains {itemCount} items</h4>
                        <input
                            type="search"
                            placeholder="Search"
                            className="form-control mb-3"
                            value={searchInput}
                            onChange={handleSearchInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    searchInput: PropTypes.string.isRequired,
    handleSearchInput: PropTypes.func.isRequired,
};

export default PageHeader;
