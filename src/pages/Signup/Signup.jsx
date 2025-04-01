import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
import "../../index.css";
import Modal from "../../components/Modal/Modal";
import { postData } from "../../services/apiService";


const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/register/";


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('')
    const navigate = useNavigate();

    const saveContactToken = "05ed591a17495a3919862aa9cd673cda64ee9529"
  
    const handleInputChange = (e, setter) => {
      setter(e.target.value);
    };
  
    const handleCheckboxChange = (e) => {
      setIsPolicyAccepted(e.target.checked);
      setIsDisabled(!e.target.checked);
    };
  
    
    const signUp = async (e) => {
      e.preventDefault();
      if (passwordOne !== passwordTwo) {
        displayModal("Passwords do not match");
        return;
      }
  
      try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: email,
            first_name: name,
            password: passwordOne,
            repeated_password: passwordTwo,
          }),
        });
        
        const jsonResponse = await response.json();
        await checkSignUpResponse(jsonResponse);
      } catch (error) {
        console.error(error);
        setIsDisabled(false);
      }
    };
  
    
    const checkSignUpResponse = async (response) => {
      if (response.username[0] === "A user with that username already exists.") {
        displayModal("A user with this email already exists.");
        setIsDisabled(false);
        return;
      } else if (!response.token) {
        displayModal("Sign up failed. Please try again.");
        setIsDisabled(false);
        return;
      } else {
        setIsDisabled(false);
        displayModal("You signed up succesfully.");
        createNewContactForSignedUpUser();
        setTimeout(() => {
          navigate('/');
        }, 3500); 
      }
    };


    const displayModal = (message) => {
      setModalMessage(message)
      setIsModalVisible(true);
      
      setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);
    }
   

    const createNewContactForSignedUpUser = async () => {
      let newContact = getNewContactObject();
      await postData("contacts/", newContact, saveContactToken);
    }


    const getNewContactObject = () => {
      const newContact = {
        name: name,
        mail: email,
        phone: "",
        initials: getContactInitials(name),
        info: "Contact Information",
        color: "#FFBB2B",
      };

      return newContact;
    }
  
    const getContactInitials = (name) => {
      return name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    };
    
  
    return (
      <div className="index-main">
        <div className="index-header-2">
          <img src="assets/img/logo_dark.png" className="index-header-logo" alt="logo" />
        </div>
  
        <div className="sign-up">
            <Link to="/" className="return-img-sign-up">
                <img src="assets/img/arrow-left-line.png" alt="back" />
            </Link>
          <h2>Sign up</h2>
          <div className="log-in-underline"></div>
          <form id="sign-up-form" onSubmit={signUp}>
            <div className="index-input-container">
              <img src="assets/img/person.png" className="index-input-icon" alt="person" />
              <input
                type="text"
                placeholder="Name"
                id="name"
                className="index-input"
                required
                minLength="5"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
              />
            </div>
            <div className="index-input-container">
              <img src="assets/img/mail.png" className="index-input-icon" alt="mail" />
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="index-input"
                required
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </div>
            <div className="index-input-container">
              <img src="assets/img/lock.png" className="index-input-icon" alt="lock" />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="index-input"
                required
                minLength="6"
                value={passwordOne}
                onChange={(e) => handleInputChange(e, setPasswordOne)}
              />
            </div>
            <div className="index-input-container">
              <img src="assets/img/lock.png" className="index-input-icon" alt="lock" />
              <input
                type="password"
                placeholder="Confirm Password"
                id="password2"
                className="index-input"
                required
                minLength="6"
                value={passwordTwo}
                onChange={(e) => handleInputChange(e, setPasswordTwo)}
              />
            </div>
  
            <div className="checkbox-container-2">
              <input
                type="checkbox"
                id="policy"
                name="policy"
                className="remember-checkbox"
                checked={isPolicyAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="policy" className="checkbox-label">
                I accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </label>
            </div>
  
            <button className="sign-up-btn-2" type="submit" id="sign-up-btn-2" disabled={isDisabled}>
              Sign up
            </button>
          </form>
        </div>
  
        <div className="index-link-div">
          <a href="/privacy-policy" target="_blank">Privacy Policy</a>
          <a href="/legal-notice" target="_blank">Legal Notices</a>
        </div>
  
        
        <Modal isOpen={isModalVisible} message={modalMessage}></Modal>
      </div>
    );
  };
  
  export default SignUp;