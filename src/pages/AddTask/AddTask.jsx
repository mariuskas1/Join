import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import "../../index.css";
import { getCurrentUserData } from '../../services/apiService';
import { getAllContacts } from '../../services/apiService';





const AddTask = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);


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


    return(
        <main>
            <h1>Add Task</h1>
            <TaskForm contacts={contacts} currentUserData={currentUser}></TaskForm>
        </main>
    )

}

export default AddTask;