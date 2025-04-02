import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Board from "./pages/Board/Board";
import AddTask from "./pages/AddTask/AddTask";
import Contacts from "./pages/Contacts/Contacts";
import Summary from "./pages/Summary/Summary";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LegalNotice from "./pages/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import HelpPage from "./pages/HelpPage";

const App = () => {
  return (
    <Routes>
      {/* Routes for login and signup */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main layout */}
      <Route
        path="/*"
        element={
          <div>
            <Header />
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="board" element={<Board />} />
                <Route path="add-task" element={<AddTask />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="summary" element={<Summary />} />
                <Route path="legal-notice" element={<LegalNotice />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="help" element={<HelpPage />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
