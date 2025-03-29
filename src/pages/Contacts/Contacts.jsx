import React, { useEffect, useState } from 'react';
import "./Contacts.css";
import "../../index.css";
import { getCurrentUserData, getAllContacts } from '../../services/apiService';
import ActiveContactModal from '../../components/ActiveContactModal/ActiveContactModal';
import { AnimatePresence } from 'framer-motion';


const Contacts = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [groupedContacts, setGroupedContacts] = useState({});

    const [exitingContact, setExitingContact] = useState(null);
    const [activeContact, setActiveContact] = useState(null);
    const showActiveContact = Boolean(activeContact);

    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [showEditContactModal, setShowEditContactModal] = useState(false);
    const [showContactDetails, setShowContactDetails] = useState(false);

      
    useEffect(() => {
      const userData = getCurrentUserData();
      setCurrentUser(userData);
    }, []);

    

    useEffect(() => {
        const fetchContacts = async () => {
          if (currentUser && currentUser.token) {
            try {
              const contactsData = await getAllContacts(currentUser.token);
              setContacts(contactsData);
            } catch (err) {
              console.error(err);
            } 
          }
        };
        fetchContacts();
    }, [currentUser]);

    useEffect(() => {
        if (contacts.length > 0) {
              sortContacts();
          }
    }, [contacts]);

    function sortContacts() {
        const grouped = {};
        const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

        sortedContacts.forEach(contact => {
            const firstLetter = contact.name.charAt(0).toUpperCase();
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(contact);
        });

        setGroupedContacts(grouped);
    }

    function getContactGroupTemplate(letter, group) {
      return (
          <div className="contacts-group" key={letter}>
              <div className="contacts-group-letter">{letter}</div>
              <div className="contacts-display-bar">
                  {group.map(contact => getContactItemTemplate(contact))}
              </div>
          </div>
      );
    }


    function getContactItemTemplate(contact) {
      return (
          <div className={`contacts-display-small ${activeContact && activeContact.id === contact.id ? "active-contact-sm" : ""}`} 
                key={contact.id} onClick={() => activateContact(contact)}>
              <div className="initials-div" style={{ backgroundColor: contact.color }}>
                  {contact.initials}
              </div>
              <div className="contacts-display-info">
                  <div className="contact-name-sm">{contact.name}</div>
                  <div className="contact-mail-sm">{contact.mail}</div>
              </div>
          </div>
      );
    }

    const activateContact = (contact) => {
      if (activeContact) {
        setExitingContact(activeContact); // Track old contact for exit animation
        setActiveContact(null); // Hide current contact
        setTimeout(() => {
          setExitingContact(null); // Remove exiting contact after animation
          setActiveContact(contact); // Set new contact
        }, 400); // Exit animation duration
      } else {
        setActiveContact(contact);
      }
    };

    

    const displayAddContactModal = () => {

    }
    const handleHideContactDetails = () => {

    }
    const handleEditContact = () => {

    }
    const handleDeleteContact = () => {

    }
    const handleAddContact = () => {
        
    }


      return (
        <div className="main-contacts">
          <div className="contacts-display-div">
            <button className="add-contact-btn" id="add-contact-btn" onClick={displayAddContactModal}>
              Add new contact <img src="assets/img/person_add.png" className="add-contact-icon" />
            </button>
            <div id="contacts-display-bar">
                {Object.keys(groupedContacts).map(letter => {
                      return getContactGroupTemplate(letter, groupedContacts[letter]);
                })}
            </div>
          </div>
    
          <div className="contact-display">
              <div className="contacts-display-header">
                  <h1>Contacts</h1>
                  <div className="contacts-header-bar" id="c-header-bar-desktop"></div>
                  <span className="contacts-header-span">Better with a team</span>
                  <div className="contacts-header-bar" id="c-header-bar-mobile"></div>
              </div>

              <img
                  src="assets/img/arrow-left-line.png"
                  className="return-arrow-contacts-mobile return-img"
                  onClick={handleHideContactDetails}
                  alt="Back"
              />

              <div className="contact-display-body" id="single-contact-display-div">
              <AnimatePresence>
                {exitingContact && (
                  <ActiveContactModal key={exitingContact.id} contact={exitingContact} isOpen={false} />
                )}
                {activeContact && (
                  <ActiveContactModal key={activeContact.id} contact={activeContact} isOpen={true} />
                )}
              </AnimatePresence>
              </div>

              <div className="user-menu-bg d-none" id="scd-options-menu">
                  <div className="scd-options-menu">
                      <button className="scd-option-btn" onClick={handleEditContact}>
                          <img src="assets/img/edit.png" alt="Edit" /> Edit
                      </button>
                      <button className="scd-option-btn" onClick={handleDeleteContact}>
                          <img src="assets/img/delete.png" alt="Delete" /> Delete
                      </button>
                  </div>
              </div>
          </div>

          <button className="add-contact-btn-mobile" id="addContactBtnMobile" onClick={handleAddContact}>
              <img src="assets/img/person_add.png" id="mobileContactOptionsBtn" alt="Add Contact" />
          </button>
    
        </div>
      );
}

export default Contacts;