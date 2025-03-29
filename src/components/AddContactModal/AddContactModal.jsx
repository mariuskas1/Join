import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./AddContactModal.css";

const AddContactModal = ({ isOpen, onClose }) => {
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });

    const handleChange = (e) => {
      setContact({ ...contact, [e.target.name]: e.target.value });
    };
  
    

    const createNewContact = (e) => {
        e.preventDefault();
      
        onClose();
    } 
  

    return createPortal(
        <div className="add-contact-modal-bg" onClick={onClose}>
          <motion.div
            initial={{ x: "200%" }}
            animate={{ x: isOpen ? "0%" : "200%" }}
            exit={{ x: "200%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="add-contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-contact-modal-left">
              <img src="assets/img/Capa 2.png" className="add-contact-modal-logo" />
              <div className="add-contact-modal-lh">
                <img src="assets/img/Close_white.png" onClick={onClose} className="close-contact-modal-icon" />
              </div>
              <span className="add-contact-modal-title">Add contact</span>
              <span className="add-contact-team">Tasks are better with a team!</span>
              <div className="modal-bar"></div>
            </div>
            <div className="add-contact-modal-right">
              <div className="add-contact-modal-rh">
                <img src="assets/img/Close2.png" onClick={onClose} className="close-contact-modal-icon" />
              </div>
              <div className="add-contact-form-div">
                <form onSubmit={createNewContact} className="add-contact-form">
                  <div className="index-input-container add-contact-input-container">
                    <img src="assets/img/person2.png" className="index-input-icon add-contact-icon" />
                    <input type="text" name="name" placeholder="Name" value={contact.name} onChange={handleChange} className="index-input add-contact-input" required />
                  </div>
                  <div className="index-input-container">
                    <img src="assets/img/mail.png" className="index-input-icon add-contact-icon" />
                    <input type="email" name="email" placeholder="Email" value={contact.email} onChange={handleChange} className="index-input add-contact-input" required />
                  </div>
                  <div className="index-input-container">
                    <img src="assets/img/call.png" className="index-input-icon add-contact-icon" />
                    <input type="tel" name="phone" placeholder="Phone" value={contact.phone} onChange={handleChange} className="index-input add-contact-input" required />
                  </div>
                  <div className="add-contact-form-btns">
                    <button className="cancel-contact-btn" type="button" onClick={onClose}>
                      Cancel<img className="btn-icon" src="assets/img/close.png" />
                    </button>
                    <button className="create-contact-btn" type="submit">
                      Create Contact<img className="btn-icon" src="assets/img/check_white.png" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>,
        document.getElementById("portal") 
      );
};

export default AddContactModal;
