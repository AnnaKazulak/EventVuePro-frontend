import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./list.css"

const ListItem = ({ data, basePath }) => {
  return (
    <tr key={data._id}>
      <td>
        <Link to={`${basePath}/${data._id}`} className="list-item-link">
          <div className="item-image-container">
            <img src={data.imageUrl} alt="" className="item-image rounded-circle" />
          </div>
        </Link>
      </td>
      <td>
        <Link to={`${basePath}/${data._id}`} className="item-link">
          {data.name}
        </Link>
      </td>
      <td>
        <Link to={`${basePath}/${data._id}`} className="item-link">
          {data.email}
        </Link>
      </td>
      <td>
        <Link to={`${basePath}/edit/${data._id}`} className="event-link item-edit-link">
          <i className="fas fa-pencil-alt icon-link"></i>
        </Link>
      </td>
    </tr>
  );
};

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default ListItem;