import PropTypes from 'prop-types';
import "./accordion.css";

function Accordion({ id, title, children }) {
    return (
        <div className="accordion" id={id}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${id}`}>
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${id}`}
                    >
                        {title}
                    </button>
                </h2>
                <div
                    id={`collapse${id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${id}`}
                    data-bs-parent={`#${id}`}
                >
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

Accordion.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
};

export default Accordion;
