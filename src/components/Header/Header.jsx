import React, { useEffect, useState } from "react";
import "./Header.css"; 
import { getCurrentUserData } from "../../services/apiService";
import { useNavigate, useLocation } from "react-router-dom"; 



const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const location = useLocation();
  const isPolicyPage = location.pathname === "/privacy-policy" || location.pathname === "/legal-notice" || location.pathname === "/help" ;

  useEffect(() => {
    const userData = getCurrentUserData();
    setCurrentUser(userData);
  }, []);

  const toggleUserMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOut = () => {
    localStorage.removeItem("rememberedUser");
    localStorage.removeItem("currentUser");
    navigate("/login");
  }
  
  const getUserInitials = () => {
    if (!currentUser || currentUser.isGuest) {
        return "G"; 
    }

    let currentUserName = currentUser.name.trim().split(/\s+/);
    let initials = "";

    if (currentUserName.length === 1) {
        initials = currentUserName[0][0]; 
    } else if (currentUserName.length === 2) {
        initials = currentUserName[0][0] + currentUserName[1][0]; 
    } else if (currentUserName.length > 2) {
        initials = currentUserName[0][0] + currentUserName[currentUserName.length - 1][0]; 
    }

    return initials.toUpperCase();
  };

  const saveCurrentPage = () => {
    localStorage.setItem('previousPage', window.location.pathname);
  }
  
    return (
      <header>
        <span className="header-title">Kanban Project Management Tool</span>
        <img src="/assets/img/logo_dark.png" className="header-logo-mobile" alt="Logo" />
        
        <div className="header-icons">
          <img className="help-icon" src="/assets/img/help.png" alt="Help Icon" onClick={() => navigate("/help")}/>
          <div className="user-initials" id="user-initials" onClick={toggleUserMenu}>{getUserInitials()}</div>
        </div>

        {menuOpen && (
          <div className="user-menu-bg" id="user-menu" onClick={toggleUserMenu}>
            <div className="user-menu" onClick={(e) => e.stopPropagation()}>
              <a href="/legal-notice" target="_blank" onClick={saveCurrentPage}>Legal Notice</a>
              <a href="/privacy-policy" target="_blank" onClick={saveCurrentPage}>Privacy Policy</a>
              <a href="/" onClick={logOut} className={`${isPolicyPage ? "hidden" : ""}`}>Log out</a>
            </div>
          </div>
        )}
      </header>


    );
  };
  
  export default Header;