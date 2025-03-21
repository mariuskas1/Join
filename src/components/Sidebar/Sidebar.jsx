import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; 


const Sidebar = () => {
    return (
      <div className="sidebar">
        <img className="sidebar-logo" src="/assets/img/logo_light.png" alt="Logo" />
        
        <div className="sidebar-menu">
          <Link to="/summary" className="sidebar-menu-div summary-div">
            <img className="sidebar-icon" src="/assets/img/vector1.png" alt="Summary Icon" />
            <span>Summary</span>
          </Link>
          <Link to="/add-task" className="sidebar-menu-div add-task-div">
            <img className="sidebar-icon" src="/assets/img/edit_square.png" alt="Add Task Icon" />
            <span>Add Task</span>
          </Link>
          <Link to="/board" className="sidebar-menu-div board-div">
            <img className="sidebar-icon" src="/assets/img/Vector.png" alt="Board Icon" />
            <span>Board</span>
          </Link>
          <Link to="/contacts" className="sidebar-menu-div contacts-div">
            <img className="sidebar-icon" src="/assets/img/perm_contact_calendar.png" alt="Contacts Icon" />
            <span>Contacts</span>
          </Link>
        </div>
  
        <div className="sidebar-menu-2">
          <div className="sidebar-2-div">
            <a href="/privacy-policy" target="_blank">Privacy Policy</a>
            <a href="/legal-notice" target="_blank">Legal Notices</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;