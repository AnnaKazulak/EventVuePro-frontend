import PropTypes from "prop-types";

const Tabs = ({ activeTab, handleTabClick, tabs }) => {
    return (
        <ul className="nav nav-tabs mb-3">
            {tabs.map((tab) => (
                <li className="nav-item" key={tab.key}>
                    <a
                        className={`nav-link ${activeTab === tab.value && "active"}`}
                        href="#"
                        onClick={() => handleTabClick(tab.value)}
                    >
                        {tab.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

Tabs.propTypes = {
    activeTab: PropTypes.string.isRequired,
    handleTabClick: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Tabs;
