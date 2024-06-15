import React from 'react';

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  };

  const modalDialogStyle = {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '200px',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  };

  const modalContentStyle = {
    padding: '20px',
    color: 'white'
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-dialog" style={modalDialogStyle}>
        <div className="modal-content" style={{backgroundColor: '#222B40'}}>
          <div className="modal-header" style={{backgroundColor: '#222B40'}}>
            <h5 className="modal-title">Xác nhận xóa bài viết</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body" style={modalContentStyle}>
            <span className='text-white'>Bạn có chắc chắn muốn xóa bài viết này không?</span>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" style={buttonStyle} onClick={onClose}>Hủy</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;



