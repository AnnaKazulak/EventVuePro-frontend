import PropTypes from 'prop-types';

const DeleteModal = ({ itemName, show, onDelete, onClose }) => {


  return (
    <div className={`lightbox-overlay modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog custom-modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={onClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete <strong className='text-pink'>{itemName}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>

          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  itemName: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteModal;
