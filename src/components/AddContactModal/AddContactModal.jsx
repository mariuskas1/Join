import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import "./../../index.css";
import "./AddContactModal.css";
import "../../pages/Contacts/Contacts.css";
import { postData } from "../../services/apiService";

const AddContactModal = ({ isOpen, onClose, contacts, setContacts, currentUser }) => {
    const colors = ["#FF7A00", "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#FF4646"];
    let colorIndex = 0;
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });

    const handleChange = (e) => {
      setContact({ ...contact, [e.target.name]: e.target.value });
    };
  
    

    const createNewContact = async (e) => {
        e.preventDefault();
        if (!contact.name || !contact.email || !contact.phone) return;
        const contactExists = contacts.some((c) => c.name === contact.name);
        if (contactExists) {
          alert("Contact already exists.");
          return;
        } 

        let newContact = getNewContactObject();
        
        const savedContact = await postData("contacts/", newContact, currentUser.token);
        console.log(savedContact);

        setContacts((prevContacts) => [...prevContacts, savedContact]);
        setContact({ name: "", email: "", phone: "" });
        onClose();
    } 


    const getNewContactObject = () => {
      const contactColor = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;

      const newContact = {
        name: contact.name,
        mail: contact.email,
        phone: contact.phone,
        initials: getContactInitials(contact.name),
        info: "Contact Information",
        color: contactColor,
      };

      return newContact;
    }
  
    const getContactInitials = (name) => {
      return name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    };

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
                    <img src="assets/img/mail.png" className="index-input-icon add-contact-icon" id="mail-icon" />
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
