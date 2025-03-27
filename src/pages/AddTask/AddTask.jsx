import React, { useEffect, useState } from 'react';
import TaskForm from '../../components/TaskForm/TaskForm';
import "../../index.css";





const AddTask = () => {

    const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";


    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getCurrentUserData();
    }, []);

    useEffect(() => {
        if (currentUser) {
            getAllContacts();
        }
    }, [currentUser]);

    const getCurrentUserData = () => {
        let currentUserLocalStorage = localStorage.getItem("currentUser");
        if (currentUserLocalStorage) {
            setCurrentUser(JSON.parse(currentUserLocalStorage));
        } else {
            setCurrentUser(null);
        }
    }

    const getAllContacts = async () => {
        try {
            const response = await fetch(BASE_URL + "contacts/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${currentUser.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setContacts(data); 
            } else {
                console.error("Failed to fetch contacts");
            }
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
    };


    return(
        <main>
            <h1>Add Task</h1>
            <TaskForm contacts={contacts}></TaskForm>
        </main>
    )

}

export default AddTask;