import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; 


const Sidebar = () => {
  const location = useLocation();

  const getImageSrc = (path) => {
    if (location.pathname === path) {
      return `assets/img/${path.replace('/', '')}1.png`; 
    }
    return `assets/img/${path.replace('/', '')}.png`; 
  };

    return (
      <div className="sidebar">
        <img className="sidebar-logo" src="/assets/img/logo_light.png" alt="Logo" />
        
        <div className="sidebar-menu">
          <NavLink to="/summary" className="sidebar-menu-div summary-div" activeClassName="active-link">
            <img className="sidebar-icon" src="/assets/img/vector1.png" alt="Summary Icon" />
            <span>Summary</span>
          </NavLink>
          <NavLink to="/add-task" className="sidebar-menu-div add-task-div" activeClassName="active-link">
            <img className="sidebar-icon" src="/assets/img/edit_square.png" alt="Add Task Icon" />
            <span>Add Task</span>
          </NavLink>
          <NavLink to="/board" className="sidebar-menu-div board-div" activeClassName="active-link">
            <img className="sidebar-icon" src="/assets/img/Vector.png" alt="Board Icon" />
            <span>Board</span>
          </NavLink>
          <NavLink to="/contacts" className="sidebar-menu-div contacts-div" activeClassName="active-link">
            <img className="sidebar-icon" src="/assets/img/perm_contact_calendar.png" alt="Contacts Icon" />
            <span>Contacts</span>
          </NavLink>
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