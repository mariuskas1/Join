import React from 'react';
import "../../index.css";
import { useNavigate, useLocation } from 'react-router-dom';


const PrivacyPolicy = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToPreviousPage = () => {
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) navigate(previousPage);
    };

    return (
        <div className="info-main">
            <div className="info-header">
                <h1>Privacy Policy</h1>
                <img 
                    src="assets/img/arrow-left-line.png" 
                    className="return-img" 
                    alt="Go back"
                    onClick={navigateToPreviousPage} 
                    style={{ cursor: 'pointer' }}
                />
            </div>
            
            <p>
                This privacy notice for Join ('we', 'us', or 'our'), describes how and why we might collect, store, use, 
                and/or share ('process') your information when you use our services ('Services'), such as when you:
            </p>
            <ul>
                <li>Visit our website at <a href="http://www.join.marius-kasparek.de">www.join.de</a>, or any website of ours that links to this privacy notice.</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
            </ul>
            <p>
                Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. 
                If you do not agree with our policies and practices, please do not use our Services. 
                If you still have any questions or concerns, please contact us at <a href="mailto:marius.kasparek@gmail.com">marius.kasparek@gmail.com</a>.
            </p>
            
            <h2>What information do we collect?</h2>
            <p><strong>In Short:</strong> We collect personal information that you provide to us.</p>
            <p>
                We collect personal information that you voluntarily provide when you register on the Services, express an interest 
                in obtaining information about us or our products, or otherwise contact us. The information may include:
            </p>
            <ul>
                <li>Names</li>
                <li>Phone numbers</li>
                <li>Email addresses</li>
                <li>Mailing addresses</li>
                <li>Job titles</li>
                <li>Usernames</li>
                <li>Passwords</li>
            </ul>
            <p><strong>Sensitive Information:</strong> We do not process sensitive information.</p>
            
            <h2>How do we process your information?</h2>
            <p>
                <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, 
                ensure security, and comply with legal obligations.
            </p>
            <ul>
                <li>To facilitate account creation and authentication.</li>
                <li>To save or protect an individual's vital interest.</li>
            </ul>
            
            <h2>What legal bases do we rely on to process your information?</h2>
            <p>
                We only process your information when we believe it is necessary and we have a valid legal basis under applicable law.
            </p>
            <ul>
                <li>Consent – You have given us permission to use your information.</li>
                <li>Legal Obligations – Compliance with legal obligations.</li>
                <li>Vital Interests – Protecting safety.</li>
            </ul>
            
            <h2>How long do we keep your information?</h2>
            <p>
                We retain personal information only as long as necessary, or as required by law. Once no longer needed, data is deleted or anonymized.
            </p>
            
            <h2>Do we collect information from minors?</h2>
            <p>
                We do not knowingly collect or solicit data from individuals under 18 years of age. If discovered, such data will be promptly deleted.
            </p>
            
            <h2>What are your privacy rights?</h2>
            <p>
                In some regions, you have rights such as:
            </p>
            <ul>
                <li>Access to your personal data.</li>
                <li>Rectification or erasure of your data.</li>
                <li>Restriction of processing.</li>
                <li>Data portability.</li>
            </ul>
            <br />
            <p>To exercise these rights, contact us at <a href="mailto:marius.kasparek@gmail.com">marius.kasparek@gmail.com</a>.</p>
            
            <h2>How can you contact us?</h2>
            <p>
                You may email us at <a href="mailto:marius.kasparek@gmail.com">marius.kasparek@gmail.com</a> or write to:
            </p>
            <br />
            <address>
                Marius Kasparek<br/>
                Papiermühlstraße 53<br/>
                04299 Leipzig<br/>
            </address>
            <br />
            <h3>Last updated: April 2, 2025</h3>
        </div>
    );
};

export default PrivacyPolicy;