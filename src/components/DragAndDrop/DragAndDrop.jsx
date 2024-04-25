import { useState } from 'react';
import PropTypes from 'prop-types';
import './drag-and-drop.css';

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
    setDragged(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleDrop(Array.from(files)); // Pass the dropped files as an array
    }
  };

  return (
    <div
      className={`drag-zone ${dragged ? 'drag-over' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDropEvent}
    >
      {children}
    </div>
  );
};

DragAndDrop.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DragAndDrop;