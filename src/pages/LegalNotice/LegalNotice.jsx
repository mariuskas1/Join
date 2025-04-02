import React from 'react';
import "../../index.css";
import { useNavigate, useLocation } from 'react-router-dom';




const LegalNotice = () => {
    const navigate = useNavigate();
    
    const navigateToPreviousPage = () => {
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) navigate(previousPage);
    };

    return (
        <div className="info-main">
          <div className="info-header">
            <h1>Legal Notice</h1>
            <img
              src="assets/img/arrow-left-line.png"
              className="return-img"
              alt="Back"
              onClick={navigateToPreviousPage}
            />
          </div>
    
          <h2>Imprint</h2>
          <br />
          <span>
            Marius Kasparek <br />
            Papiermühlstraße 53 <br />
            04299 Leipzig
          </span>
    
          <h2>Exploring the Board</h2>
          <br />
          <span>Email: marius.kasparek@gmail.com</span>
    
          <h2>Acceptance of terms</h2>
          <span>
            By accessing and using <span className="blue">Join</span>, you
            acknowledge and agree to the following terms and conditions, and any
            policies, guidelines, or amendments thereto that may be presented to you
            from time to time. We, the listed students, may update or change the
            terms and conditions from time to time without notice.
          </span>
    
          <h2>Scope and ownership of the product</h2>
          <span>
            <span className="blue">Join</span> has been developed as part of a
            student group project in a web development bootcamp at the{" "}
            <span className="blue">Developer Akademie GmbH</span>. It has an
            educational purpose and is not intended for extensive personal & business
            usage. As such, we cannot guarantee consistent availability, reliability,
            accuracy, or any other aspect of quality regarding this Product.
            <br />
            <br />
            The design of <span className="blur">Join</span> is owned by the{" "}
            <span className="blue">Developer Akademie GmbH</span>. Unauthorized use,
            reproduction, modification, distribution, or replication of the design is
            strictly prohibited.
          </span>
    
          <h2>Proprietary Rights</h2>
          <span>
            Aside from the design owned by <span className="blue">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary rights in{" "}
            <span className="blue">Join</span>, including any associated copyrighted
            material, trademarks, and other proprietary information. <br />
          </span>
    
          <h2>Use of the product</h2>
          <span>
            <span className="blue">Join</span> is intended to be used for lawful
            purposes only, in accordance with all applicable laws and regulations.
            Any use of <span className="blue">Join</span> for illegal activities, or
            to harass, harm, threaten, or intimidate another person, is strictly
            prohibited. You are solely responsible for your interactions with other
            users of <span className="blue">Join</span>.
          </span>
    
          <h2>Disclaimer of warranties and limitation of liability</h2>
          <span>
            <span className="blue">Join</span> is provided "as is" without warranty
            of any kind, whether express or implied, including but not limited to the
            implied warranties of merchantability, fitness for a particular purpose,
            and non-infringement. In no event will we, the listed students, or the{" "}
            <span className="blue">Developer Akademie</span>, be liable for any
            direct, indirect, incidental, special, consequential or exemplary
            damages, including but not limited to, damages for loss or profits,
            goodwill, use, data, or other intangible losses, even if we have been
            advised of the possibility of such damages, arising out of or in
            connection with the use or performance of <span className="blue">Join</span>.
          </span>
    
          <h2>Indemnity</h2>
          <span>
            You agree to indemnify, defend and hold harmless us, the listed students,
            the <span className="blue">Developer Akademie</span>, and our affiliates,
            partners, officers, directors, agents, and employees, from and against
            any claim, demand, loss, damage, cost, or liability (including reasonable
            legal fees) arising out of or relating to your use of <span className="blue">Join</span> and/or your breach of this legal notice.{" "}
            <br />
            <br />
            For any questions or notices, please contact us at
            marius.kasparek@gmail.com.
            <br />
            <br />
            Date: April 2, 2025
          </span>
        </div>
      );
}

export default LegalNotice;