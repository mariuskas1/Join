import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./AddContactModal.css";

const AddContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-contact-modal-bg" onClick={onClose}>
      <div className="add-contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-contact-modal-left">
          <img src="assets/img/Capa 2.png" className="add-contact-modal-logo" alt="Logo" />
          <div className="add-contact-modal-lh">
            <img src="assets/img/Close_white.png" onClick={onClose} className="close-contact-modal-icon" alt="Close" />
          </div>
          <span className="add-contact-modal-title">Add Contact</span>
          <span className="add-contact-team">Tasks are better with a team!</span>
          <div className="modal-bar"></div>
        </div>
        <div className="add-contact-modal-right">
          <div className="add-contact-modal-rh">
            <img src="assets/img/Close2.png" onClick={onClose} className="close-contact-modal-icon" alt="Close" />
          </div>
          <div className="add-contact-form-div">
            <img src="assets/img/Group 144.png" className="new-contact-img" alt="Avatar" />
            <form onSubmit={handleSubmit} className="add-contact-form">
              <div className="index-input-container add-contact-input-container">
                <img src="assets/img/person2.png" className="index-input-icon add-contact-icon" alt="Person" />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required minLength={5} className="index-input add-contact-input" />
              </div>
              <div className="index-input-container">
                <img src="assets/img/mail.png" className="index-input-icon add-contact-icon" alt="Mail" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="index-input add-contact-input" />
              </div>
              <div className="index-input-container">
                <img src="assets/img/call.png" className="index-input-icon add-contact-icon" alt="Call" />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={7} pattern="^(\+|0)[0-9 ]*$" title="+49 1234 56789 / 0123456789" className="index-input add-contact-input" />
              </div>
              <div className="add-contact-form-btns">
                <button type="button" className="cancel-contact-btn" onClick={onClose}>
                  Cancel <img className="btn-icon" src="assets/img/close.png" alt="Close" />
                </button>
                <button type="submit" className="create-contact-btn">
                  Create Contact <img className="btn-icon" src="assets/img/check_white.png" alt="Check" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
