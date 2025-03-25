import React from "react";
import "./Header.css"; 


const Header = () => {
  
    return (
      <header>
        <span className="header-title">Kanban Project Management Tool</span>
        <img src="/assets/img/logo_dark.png" className="header-logo-mobile" alt="Logo" />
        
        <div className="header-icons">
          <img className="help-icon" src="/assets/img/help.png" alt="Help Icon" />
          <div className="user-initials" id="user-initials">U</div>
        </div>
      </header>
    );
  };
  
  export default Header;