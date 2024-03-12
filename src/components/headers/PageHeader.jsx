import PropTypes from "prop-types";

const PageHeader = ({ title, itemCount, pageTitle, searchInput, handleSearchInput }) => {

    return (
        <div className="row align-items-center header">
            <div className="col-md-4">
                <h1>{title}</h1>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Your <span className="text-secondary">{pageTitle}</span> list contains {itemCount} items</h4>
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
    pageTitle: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    searchInput: PropTypes.string.isRequired,
    handleSearchInput: PropTypes.func.isRequired,
};

export default PageHeader;