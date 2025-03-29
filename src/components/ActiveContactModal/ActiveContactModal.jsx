import React from "react";
import { motion } from "framer-motion";
import "./../../index.css";
import "./ActiveContactModal.css";



const ActiveContactModal = ({ contact, onEdit, onDelete, isOpen }) => {

    return (
        <motion.div
            initial={{ x: "300%" }}
            animate={{ x: isOpen ? "0%" : "300%" }}
            exit={{ x: "300%" }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="single-contact-display" 
        >
          <div className="single-contact-display-header">
            <div className="scd-initials" style={{ backgroundColor: contact.color }}>
              {contact.initials}
            </div>
            <div className="scd-name-div">
              <span className="scd-name">{contact.name}</span>
              <div className="scd-options-div">
                <button className="scd-option-btn" onClick={onEdit}>
                  <img src="assets/img/edit.png" alt="Edit" /> Edit
                </button>
                <button className="scd-option-btn" onClick={onDelete}>
                  <img src="assets/img/delete.png" alt="Delete" /> Delete
                </button>
              </div>
            </div>
          </div>
          <div className="single-contact-display-body">
            <span className="contact-info">Contact Information</span>
            <span className="scd-info-title">Email</span>
            <span className="contact-mail">{contact.mail}</span>
            <span className="scd-info-title">Phone</span>
            <span className="contact-phone">{contact.phone}</span>
          </div>
        </motion.div>
    );
};

export default ActiveContactModal;