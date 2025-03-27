import React, { useState } from 'react';
import "./Contacts.css";
import "../../index.css";


const Contacts = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewContact({
          ...newContact,
          [id]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function to upload the new contact
        uploadNewContact();
      };
    
      const uploadNewContact = () => {
        // Handle the logic for uploading new contact
        console.log('Contact uploaded:', newContact);
        setModalVisible(false); // Close the modal after submission
      };
    
      const clearForm = () => {
        setNewContact({
          name: '',
          email: '',
          phone: ''
        });
      };
    
      const displayAddContactModal = () => {
        setModalVisible(true);
      };
    
      const hideAddContactModal = () => {
        setModalVisible(false);
      };

      return (
        <div className="main-contacts">
          <div className="contacts-display-div">
            <button
              className="add-contact-btn"
              id="add-contact-btn"
              onClick={displayAddContactModal}
            >
              Add new contact{" "}
              <img src="assets/img/person_add.png" className="add-contact-icon" />
            </button>
            <div id="contacts-display-bar"></div>
          </div>
    
          <div className="contact-display">
            <div className="contacts-display-header">
              <h1>Contacts</h1>
              <div className="contacts-header-bar" id="c-header-bar-desktop"></div>
              <span className="contacts-header-span">Better with a team</span>
              <div className="contacts-header-bar" id="c-header-bar-mobile"></div>
            </div>
          </div>
    
          {/* Modal for adding contact */}
          {isModalVisible && (
            <div
              className="add-contact-modal-bg"
              id="add-contact-modal"
              onClick={hideAddContactModal}
            >
              <div
                className="add-contact-modal"
                onClick={(e) => e.stopPropagation()}
                id="inner-add-contact-modal"
              >
                <div className="add-contact-modal-left">
                  <img src="assets/img/Capa 2.png" className="add-contact-modal-logo" />
                  <div className="add-contact-modal-lh">
                    <img
                      src="assets/img/Close_white.png"
                      onClick={hideAddContactModal}
                      className="close-contact-modal-icon"
                    />
                  </div>
                  <span className="add-contact-modal-title" id="add-contact-modal-title">
                    Add contact
                  </span>
                  <span className="add-contact-team" id="add-contact-team">
                    Tasks are better with a team!
                  </span>
                  <div className="modal-bar"></div>
                </div>
                <div className="add-contact-modal-right">
                  <div className="add-contact-modal-rh">
                    <img
                      src="assets/img/Close2.png"
                      onClick={hideAddContactModal}
                      className="close-contact-modal-icon"
                    />
                  </div>
                  <div className="add-contact-form-div">
                    <img
                      src="assets/img/Group 144.png"
                      className="new-contact-img"
                      id="contact-initials-l"
                    />
                    <form
                      onSubmit={handleSubmit}
                      className="add-contact-form"
                      id="add-contact-form"
                    >
                      <div className="index-input-container add-contact-input-container">
                        <img
                          src="assets/img/person2.png"
                          className="index-input-icon add-contact-icon"
                        />
                        <input
                          type="text"
                          placeholder="Name"
                          id="name"
                          className="index-input add-contact-input"
                          required
                          value={newContact.name}
                          onChange={handleInputChange}
                          minLength="5"
                        />
                      </div>
                      <div className="index-input-container">
                        <img
                          src="assets/img/mail.png"
                          className="index-input-icon add-contact-icon"
                          id="mail-icon"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          className="index-input add-contact-input"
                          required
                          value={newContact.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="index-input-container">
                        <img
                          src="assets/img/call.png"
                          className="index-input-icon add-contact-icon"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          id="phone"
                          className="index-input add-contact-input"
                          required
                          value={newContact.phone}
                          onChange={handleInputChange}
                          minLength="7"
                          pattern="^(\+|0)[0-9 ]*$"
                          title="+49 1234 56789 / 0123456789"
                        />
                      </div>
    
                      <div className="add-contact-form-btns">
                        <button
                          type="button"
                          className="cancel-contact-btn"
                          id="cancel-or-delete-btn"
                          onClick={clearForm}
                        >
                          Cancel
                          <img className="btn-icon" src="assets/img/close.png" />
                        </button>
                        <button className="create-contact-btn" id="create-or-save-btn" type="submit">
                          Create Contact
                          <img className="btn-icon" src="assets/img/check_white.png" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Contacts;