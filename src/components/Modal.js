import React from "react";
import "../App.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-form modal-content">
        {children}
        <button className="close-button" onClick={onClose}>x</button>
      </div>
    </div>
  );
}

export default Modal;
