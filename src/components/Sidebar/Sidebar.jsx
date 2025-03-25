import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; 


const Sidebar = () => {
  const location = useLocation();

  const getImageSrc = (path) => {
    const formattedPath = path.replace('/', ''); // Remove leading slash if any
    return location.pathname === `/${formattedPath}`
      ? `assets/img/${formattedPath}1.png`
      : `assets/img/${formattedPath}.png`;
  };

    return (
      <div className="sidebar">
        <img className="sidebar-logo" src="/assets/img/logo_light.png" alt="Logo" />
        
        <div className="sidebar-menu">
          <NavLink to="/summary" className="sidebar-menu-div summary-div" >
            <img className="sidebar-icon" src={getImageSrc('summary')} alt="Summary Icon" />
            <span>Summary</span>
          </NavLink>
          <NavLink to="/add-task" className="sidebar-menu-div add-task-div" >
            <img className="sidebar-icon" src={getImageSrc('add_task')} alt="Add Task Icon" />
            <span>Add Task</span>
          </NavLink>
          <NavLink to="/board" className="sidebar-menu-div board-div" >
            <img className="sidebar-icon" src={getImageSrc('board')} alt="Board Icon" />
            <span>Board</span>
          </NavLink>
          <NavLink to="/contacts" className="sidebar-menu-div contacts-div" >
            <img className="sidebar-icon" src={getImageSrc('contacts')} alt="Contacts Icon" />
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