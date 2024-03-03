import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListItem = ({ data, basePath }) => {
  return (
    <tr key={data._id}>
      <td>
        <Link
          to={`${basePath}/${data._id}`}
          style={{ textDecoration: "none" }}
          className="text-decoration-none text-dark d-flex align-items-center"
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              overflow: "hidden",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          >
            <img
              src={data.imageUrl}
              alt=""
              className="rounded-circle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Link>
      </td>
      <td>
        <Link
          to={`${basePath}/${data._id}`}
          style={{ textDecoration: "none" }}
          className="text-decoration-none text-dark d-flex align-items-center"
        >
          {data.name}
        </Link>
      </td>
      <td>{data.email}</td>
      <td>
        <Link
          to={`${basePath}/edit/${data._id}`}
          className="event-link me-4"
        >
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
