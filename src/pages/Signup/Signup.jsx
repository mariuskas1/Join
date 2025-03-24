import React, { useState } from "react";
import "./Signup.css";
import "../../index.css";

const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/register/";


const SignUp = () => {
    // State to manage the form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    // Handle input change
    const handleInputChange = (e, setter) => {
      setter(e.target.value);
    };
  
    // Handle checkbox change
    const handleCheckboxChange = (e) => {
      setIsPolicyAccepted(e.target.checked);
      setIsDisabled(!e.target.checked);
    };
  
    // Handle the sign-up logic
    const signUp = async (e) => {
      e.preventDefault();
  
      if (passwordOne !== passwordTwo) {
        setErrorMessage("Passwords do not match");
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
  
        await checkSignUpResponse(response);
      } catch (error) {
        console.error(error);
        setIsDisabled(false);
      }
    };
  
    // Check the response from the API after the sign-up attempt
    const checkSignUpResponse = async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        setErrorMessage(errorData.message || "Error during sign-up");
        setIsDisabled(false);
        return;
      }
  
      const data = await response.json();
      displaySignedUpModal();
      setIsDisabled(false);
  
      setTimeout(() => {
        window.location.href = "index.html?msg=You signed up successfully";
      }, 1000);
    };
  
    // Display the "signed-up successfully" modal
    const displaySignedUpModal = () => {
      setIsModalVisible(true);
    };
  
    // Close the modal
    const closeModal = () => {
      setIsModalVisible(false);
    };
  
    return (
      <div className="index-main">
        <div className="index-header-2">
          <img src="assets/img/logo_dark.png" className="index-header-logo" alt="logo" />
        </div>
  
        <div className="sign-up">
          <img
            src="assets/img/arrow-left-line.png"
            className="return-img-sign-up"
            alt="back"
            onClick={() => window.location.href = "index.html"}
          />
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
  
            {errorMessage && <div id="log-in-msg">{errorMessage}</div>}
  
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
                I accept the <a href="privacy_policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </label>
            </div>
  
            <button className="sign-up-btn-2" type="submit" id="sign-up-btn-2" disabled={isDisabled}>
              Sign up
            </button>
          </form>
        </div>
  
        <div className="index-link-div">
          <a href="privacy_policy.html">Privacy Policy</a>
          <a href="legal_notice.html">Legal notices</a>
        </div>
  
        {/* Modal for successful sign-up */}
        {isModalVisible && (
          <div className="sign-up-modal-bg" id="sign-up-modal-bg">
            <div className="sign-up-modal" id="sign-up-modal">
              You Signed Up successfully
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default SignUp;