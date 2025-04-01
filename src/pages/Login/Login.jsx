import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import "../../index.css";
import Modal from "../../components/Modal/Modal";



const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/login/";
const GUEST_URL = "https://marius-kasparek.developerakademie.org/join_server/api/guest-login/";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('')

    const logoRef = useRef(null);
    const mainContentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth < 480 && logoRef.current) {
            logoRef.current.src = "/assets/img/logo_light.png";
        }

        setTimeout(startLogoAnimation, 400);
        setTimeout(checkForRememberedUser, 2000);
    }, []);

    function startLogoAnimation() {

        const headerLogo = document.getElementById("index-header-logo");
        if (!headerLogo) return;

        const headerLogoPosition = headerLogo.getBoundingClientRect();

        logoRef.current.style.top = `${headerLogoPosition.top}px`;
        logoRef.current.style.left = `${headerLogoPosition.left}px`;

        logoRef.current.className =
            window.innerWidth < 800
                ? "index-header-logo-800"
                : window.innerWidth < 600
                ? "index-header-logo-600"
                : "index-header-logo-size";

        setTimeout(() => {
            if (mainContentRef.current) {
                mainContentRef.current.classList.remove("hidden");
            }
            setShowLogo(false);
        }, 1000);
    }

    function checkForRememberedUser() {
        const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser") || "null");
        if (rememberedUser) {
            localStorage.setItem("currentUser", JSON.stringify(rememberedUser));
            navigate("/summary");
        }
    }

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password, email }),
            });

            const data = await response.json();
            checkLoginResponse(data);
            
        } catch (error) {
            displayModal("Login failed. Please try again.")
        }
    }


    const checkLoginResponse = (data) => {
        if (!data.token) {
            displayModal("Email or password are incorrect.");
            setEmail("");
            setPassword("");
            return;
        } 
       
        const user = { token: data.token, username: data.username, email: data.email, name: data.name };
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem("rememberedUser", JSON.stringify(user));
        }
        navigate("/summary");
    }

    async function guestLogin() {
        try {
            const response = await fetch(GUEST_URL, { method: "POST", headers: { "Content-Type": "application/json" } });

            if (!response.ok) throw new Error("Guest login failed");

            const data = await response.json();
            const guestUser = { token: data.token, username: data.username, isGuest: true };

            localStorage.setItem("currentUser", JSON.stringify(guestUser));
            navigate("/summary");
        } catch (error) {
            console.error("Guest login error:", error);
        }
    }


    const displayModal = (message) => {
        setModalMessage(message)
        setIsModalVisible(true);
        
        setTimeout(() => {
          setIsModalVisible(false);
        }, 3000);
      }


    return (
        <div>
            {/* Initial Logo Animation */}
            {showLogo && (
                <div className="initial-logo-div" id="initial-logo-div">
                    <img
                        ref={logoRef}
                        src="/assets/img/logo_dark.png"
                        className="initial-index-logo"
                        id="initial-index-logo"
                        alt="Logo"
                    />
                </div>
            )}

            {/* Main Content */}
            <div className="index-main hidden" ref={mainContentRef}>
                <div className="index-header">
                    <img src="/assets/img/logo_dark.png" className="index-header-logo" id="index-header-logo" alt="Logo" />
                    <div className="index-header-div">
                        <span className="index-header-text">Not a Join user?</span>
                        <Link to="/signup" className="sign-up-btn">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Login Form */}
                <div className="log-in">
                    <h2>Log in</h2>
                    <div className="log-in-underline"></div>
                    <form onSubmit={handleLogin}>
                        <div className="index-input-container">
                            <img src="/assets/img/mail.png" className="index-input-icon" alt="Mail" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="index-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="index-input-container">
                            <img src="/assets/img/lock.png" className="index-input-icon" alt="Lock" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="index-input"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="log-in-row">
                            <div className="checkbox-container">
                                <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                        </div>

                        <div className="log-in-buttons-div">
                            <button type="submit" className="log-in-btn">Log in</button>
                            <button type="button" onClick={guestLogin} className="guest-log-in-btn">Guest Log in</button>
                        </div>
                    </form>
                </div>

               
                <div className="index-link-div">
                    <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>
                    <Link to="/legal-notice" target="_blank">Legal notices</Link>
                </div>
            </div>

            <Modal isOpen={isModalVisible} message={modalMessage}></Modal>
        </div>
    );
};

export default Login;
