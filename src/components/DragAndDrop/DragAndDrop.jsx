import { useState } from 'react';
import PropTypes from 'prop-types';
import './drag-and-drop.css'; // Import CSS file for styling

const DragAndDrop = ({ handleDrop, children }) => {
  const [dragged, setDragged] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragged(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragged(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleDrop(files); // Pass the dropped files to the handleDrop function
    }
    setDragged(false);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDropEvent}
    >
      <div >
        {dragged ? <div>Drop here</div> : children}
      </div>
    </div>
  );
};

DragAndDrop.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DragAndDrop;
