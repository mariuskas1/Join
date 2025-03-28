import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import "../../index.css";
import "./AddTask.css";
import { getCurrentUserData } from '../../services/apiService';
import { getAllContacts } from '../../services/apiService';
import { motion } from 'framer-motion'; 
import TaskAddedModal from '../../components/TaskAddedModal/TaskAddedModal';



const AddTask = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const userData = getCurrentUserData();
        setCurrentUser(userData);
    }, []);


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
        console.log('task added')
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