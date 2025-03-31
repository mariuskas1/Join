import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./EditContactModal.css";

const EditContactModal = ({ contact, isOpen, onClose,  onDelete, setContacts, currentUser, setActiveContact }) => {
    const [editedContact, setEditedContact] = useState({ name: "", mail: "", phone: "" });

    const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/contacts/";


    useEffect(() => {
        if (contact) {
            setEditedContact(contact);
        }
    }, [contact]);

    const handleChange = (e) => {
        setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
    };


    const editContact = async (e) => {
        e.preventDefault();
        
        try {
          await fetch(`${BASE_URL}${contact.id}/`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${currentUser.token}`,
              },
              body: JSON.stringify(editedContact),
          });
    
          editContactLocally();
          onClose();
      } catch (error) {
          console.error("Failed to update contact:", error);
      }
    };


    const editContactLocally = () => {
      setContacts((prevContacts) => 
        prevContacts.map((c) => (c.id === editedContact.id ? editedContact : c))
      );
      setActiveContact(editedContact);
    }

  

    return createPortal(
        <div className="edit-contact-modal-bg" onClick={onClose}>
          <motion.div
            initial={{ x: "200%" }}
            animate={{ x: isOpen ? "0%" : "200%" }}
            exit={{ x: "200%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="edit-contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-contact-modal-left">
              <img src="assets/img/Capa 2.png" className="add-contact-modal-logo" />
              <div className="add-contact-modal-lh">
                <img src="assets/img/Close_white.png" onClick={onClose} className="close-contact-modal-icon" />
              </div>
              <span className="add-contact-modal-title">Edit Contact</span>
              <span className="add-contact-team"></span> 
              <div className="modal-bar"></div>
            </div>
            <div className="add-contact-modal-right">
              <div className="add-contact-modal-rh">
                <img src="assets/img/Close2.png" onClick={onClose} className="close-contact-modal-icon" />
              </div>
              <div className="add-contact-form-div">
                <form onSubmit={editContact} className="add-contact-form">
                  <div className="index-input-container add-contact-input-container">
                    <img src="assets/img/person2.png" className="index-input-icon add-contact-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={editedContact?.name ?? ""}
                      onChange={handleChange}
                      className="index-input add-contact-input"
                      required
                    />
                  </div>
                  <div className="index-input-container">
                    <img src="assets/img/mail.png" className="index-input-icon add-contact-icon" id="mail-icon"/>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={editedContact?.mail ?? ""}
                      onChange={handleChange}
                      className="index-input add-contact-input"
                      required
                    />
                  </div>
                  <div className="index-input-container">
                    <img src="assets/img/call.png" className="index-input-icon add-contact-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={editedContact?.phone ?? ""}
                      onChange={handleChange}
                      className="index-input add-contact-input"
                      required
                    />
                  </div>
                  <div className="add-contact-form-btns">
                    <button className="cancel-contact-btn" type="button" onClick={onDelete}>
                      Delete
                    </button>
                    <button className="create-contact-btn" type="submit">
                      Save<img className="btn-icon" src="assets/img/check_white.png" />
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

export default EditContactModal;
