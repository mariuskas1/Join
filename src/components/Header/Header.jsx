import React, { useEffect, useState } from "react";
import "./Header.css"; 
import { getCurrentUserData } from "../../services/apiService";
import { useNavigate } from "react-router-dom"; 



const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = getCurrentUserData();
    setCurrentUser(userData);
    console.log("hederd:",currentUser) 
  }, []);

  const toggleUserMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOut = () => {
    localStorage.removeItem("rememberedUser");
    localStorage.removeItem("currentUser");
    navigate("/login");
  }
  
  
    return (
      <header>
        <span className="header-title">Kanban Project Management Tool</span>
        <img src="/assets/img/logo_dark.png" className="header-logo-mobile" alt="Logo" />
        
        <div className="header-icons">
          <img className="help-icon" src="/assets/img/help.png" alt="Help Icon" onClick={() => navigate("/help")}/>
          <div className="user-initials" id="user-initials" onClick={toggleUserMenu}>{currentUser?.initials || "G"}</div>
        </div>

        {menuOpen && (
          <div className="user-menu-bg" id="user-menu" onClick={toggleUserMenu}>
            <div className="user-menu" onClick={(e) => e.stopPropagation()}>
              <a href="/legal_notice" target="_blank">Legal Notice</a>
              <a href="/privacy_policy" target="_blank">Privacy Policy</a>
              <a href="/" onClick={logOut}>Log out</a>
            </div>
          </div>
        )}
      </header>


    );
  };
  
  export default Header;