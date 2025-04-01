import React, { useEffect, useState } from 'react';
import "./Contacts.css";
import "../../index.css";
import { getCurrentUserData, getAllContacts } from '../../services/apiService';
import ActiveContactModal from '../../components/ActiveContactModal/ActiveContactModal';
import { AnimatePresence } from 'framer-motion';
import AddContactModal from '../../components/AddContactModal/AddContactModal';
import EditContactModal from '../../components/EditContactModal/EditContactModal';



const Contacts = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [groupedContacts, setGroupedContacts] = useState({});
    const [activeContact, setActiveContact] = useState(null);
    const showActiveContact = Boolean(activeContact);

    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [showEditContactModal, setShowEditContactModal] = useState(false);
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [showScdOptionsMenu, setShowScdOptionsMenu] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1080);

    const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/contacts/";

      
    useEffect(() => {
      const userData = getCurrentUserData();
      setCurrentUser(userData);
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1080);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
      if(activeContact){
        setActiveContact(null);
        setTimeout(() => {
          setActiveContact(contact); 
        }, 150); 
      } else {
        setActiveContact(contact); 
      }
    };

    const toggleScdOptionsMobile = () => {
      setShowScdOptionsMenu((prev) => !prev); 
    };

    
    const handleHideContactDetails = () => {
      setActiveContact(null);
    };

    const handleEditContact = () => {

    }

    const deleteContact = async () => {
      try {
        const response = await fetch(`${BASE_URL}${activeContact.id}/`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${currentUser.token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        setShowEditContactModal(false);
        setActiveContact(null);
        setContacts((prevContacts) => prevContacts.filter(c => c.id !== activeContact.id));
      } catch (error) {
        console.error(error);
      }
    }


    return (
      <div className="main-contacts">
        {!(isMobile && showActiveContact) && (
          <div className="contacts-display-div">
            <button className="add-contact-btn" id="add-contact-btn" onClick={() => setShowAddContactModal(true)}>
              Add new contact <img src="assets/img/person_add.png" className="add-contact-icon" />
            </button>
            <div id="contacts-display-bar">
              {Object.keys(groupedContacts).map((letter) => 
                getContactGroupTemplate(letter, groupedContacts[letter])
              )}
            </div>
          </div>
        )}

        {!isMobile || showActiveContact ? (
          <div className="contact-display">
            <div className="contacts-display-header">
              <h1>Contacts</h1>
              <div className="contacts-header-bar" id="c-header-bar-desktop"></div>
              <span className="contacts-header-span">Better with a team</span>
              <div className="contacts-header-bar" id="c-header-bar-mobile"></div>
            </div>
          
            
            {isMobile && showActiveContact && (
              <img
                src="assets/img/arrow-left-line.png"
                className="return-arrow-contacts-mobile return-img"
                onClick={handleHideContactDetails}
                alt="Back"
              />
            )}
            

            <div className="contact-display-body" id="single-contact-display-div">
              <AnimatePresence>
                {showActiveContact && (
                  <ActiveContactModal
                    contact={activeContact}
                    isOpen={showActiveContact}
                    onDelete={deleteContact}
                    onEdit={() => setShowEditContactModal(true)}
                  />
                )}
              </AnimatePresence>
            </div>

            {showScdOptionsMenu && (
              <div className="user-menu-bg" onClick={toggleScdOptionsMobile}>
                <div className="scd-options-menu" id='scd-options-mobile'>
                  <button className="scd-option-btn" onClick={() => setShowEditContactModal(true)}>
                    <img src="assets/img/edit.png" alt="Edit" /> Edit
                  </button>
                  <button className="scd-option-btn" onClick={deleteContact}>
                    <img src="assets/img/delete.png" alt="Delete" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      
        

        
          <button className="add-contact-btn-mobile" id="addContactBtnMobile" onClick={showActiveContact ? toggleScdOptionsMobile : () => setShowAddContactModal(true)}>
            <img src={showActiveContact ? "assets/img/three_dots.png" : "assets/img/person_add.png"}  id="mobileContactOptionsBtn" alt="Add Contact" />
          </button>
        

        <AnimatePresence>
          {showAddContactModal && (
            <AddContactModal 
              isOpen={showAddContactModal} 
              onClose={() => setShowAddContactModal(false)} 
              contacts={contacts}
              currentUser={currentUser}
              setContacts={setContacts}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEditContactModal && activeContact && (
            <EditContactModal 
              isOpen={showEditContactModal} 
              contact={activeContact} 
              onClose={() => setShowEditContactModal(false)} 
              onDelete={deleteContact}
              setContacts={setContacts}
              currentUser={currentUser}
              setActiveContact={setActiveContact}
            />
          )}
        </AnimatePresence>
      </div>
  );
}

export default Contacts;