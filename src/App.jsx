import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./pages/Board/Board";
import AddTask from "./pages/AddTask/AddTask";
import Contacts from "./pages/Contacts/Contacts";
import Summary from "./pages/Summary/Summary";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LegalNotice from "./pages/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

// Layout component for pages that need a header and sidebar
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Redirect the root path to the login page */}
      <Route path="/" element={<Navigate replace to="/login" />} />

      {/* Public routes: Login and Signup */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private routes with the Layout wrapper */}
      <Route path="/" element={<Layout />}>
        <Route path="board" element={<Board />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="summary" element={<Summary />} />
        <Route path="legal-notice" element={<LegalNotice />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
};

export default App;
