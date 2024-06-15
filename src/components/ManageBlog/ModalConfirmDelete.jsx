import React from "react";

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className="position-absolute" style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: '0', display: isOpen ? "block" : "none",}}>
      <div
        className="modal"
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div
          className="modal-dialog"
          style={{
            maxWidth: "400px",
            borderRadius: "5px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <div className="modal-content" style={{ backgroundColor: "#222B40" }}>
            <div
              className="modal-header ps-3"
              style={{ backgroundColor: "#222B40" }}
            >
              <div className="modal-title">
                <span className="text-center">Xác nhận xóa bài viết</span>
              </div>
              <button type="button" className="close fs-2" onClick={onClose} style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: 'white', border: 'none'}}>
                <span>&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{ padding: "20px", color: "white" }}
            >
              <span className="text-white">
                Bạn có chắc chắn muốn xóa bài viết này không?
              </span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginRight: "10px" }}
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
