import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import "../../index.css";
import "./AddTask.css";
import { checkUserAuthentication, getCurrentUserData } from '../../services/apiService';
import { getAllContacts } from '../../services/apiService';
import { motion } from 'framer-motion'; 
import TaskAddedModal from '../../components/TaskAddedModal/TaskAddedModal';
import { useNavigate } from 'react-router-dom';




const AddTask = () => {
    const navigate = useNavigate(); 
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    useEffect(() => {
        const userData = getCurrentUserData(); 
        if (!userData) {
          navigate("/login");
        } else {
          handleAuthCheckResponse(userData);
        }
      }, [navigate]);


    const handleAuthCheckResponse = (userData) => {
        checkUserAuthentication(userData).then((isAuthenticated) => {
            if (isAuthenticated) {
                setCurrentUser(userData);
            } else {
                navigate("/login");
            }
        });
    }


    useEffect(() => {
        const fetchContacts = async () => {
          if (currentUser && currentUser.token) {
            try {
              const contactsData = await getAllContacts(currentUser.token);
              setContacts(contactsData);
            } catch (err) {
              console.error(err);
            } 
          }
        };
        fetchContacts();
      }, [currentUser]);


    const handleTaskAdded = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 2000);
    };


    return(
        <main>
            <h1>Add Task</h1>
            <TaskForm contacts={contacts} currentUserData={currentUser} onTaskAdded={handleTaskAdded}></TaskForm>
            <TaskAddedModal isOpen={isModalOpen} />
        </main>
    )

}

export default AddTask;