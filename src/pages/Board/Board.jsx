import React from 'react';
import { useState, useEffect } from "react";
import "./Board.css";
import "../../index.css";
import TaskCard from '../../components/TaskCard/TaskCard';

const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";


const Board = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const handleSearch = (e) => setSearchQuery(e.target.value);
    const toggleAddTaskModal = () => setShowAddTaskModal(!showAddTaskModal);

    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getCurrentUserData();
    }, []);

    useEffect(() => {
        if (currentUser) {
            getAllTasks();
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

    const getAllTasks = async () => {
        if (!currentUser) {
            console.error("No current user found!");
            return; 
        }

        try {
            let response = await fetch(BASE_URL + "tasks/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${currentUser.token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            let data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };


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
    


    useEffect(() => {
        console.log("Updated tasks state:", tasks);
    }, [tasks]);
    

    return(
    <main id="board-main">
        <div className="board-main-header">
            <h1>Board</h1>
            <div className="board-main-header-right">
            <div className="board-header-searchbar-container">
                <input
                type="text"
                placeholder="Find Task"
                className="board-header-input"
                value={searchQuery}
                onChange={handleSearch}
                />
                <img src="assets/img/search.png" className="board-input-icon" alt="Search" />
            </div>
            <button className="board-header-add-task-btn" onClick={toggleAddTaskModal}>
                Add Task <img src="assets/img/add_white.png" className="board-add-task-icon" alt="Add" />
            </button>
            <button className="board-header-btn-mobile" onClick={toggleAddTaskModal}>
                <img src="assets/img/add_white.png" className="board-add-task-icon" alt="Add" />
            </button>
            </div>
        </div>

        <div className="board-searchbar-container-mobile">
            <input type="text" placeholder="Find Task" className="board-header-input" />
            <img src="assets/img/search.png" className="board-input-icon" alt="Search" />
        </div>

        <div className="board-columns-div">
        {["To do", "In progress", "Await feedback", "Done"].map((status, index) => {
            const statusKey = status === "To do" 
                ? "todo" 
                : status.toLowerCase().replace(/\s+/g, "_");

            return (
                    <div className="board-column" key={index}>
                    <div className="board-column-header">
                        <span className="board-column-title">{status}</span>
                        <button className="board-column-add-btn" onClick={() => console.log(`Add task to ${statusKey}`)}>
                        <img src="assets/img/plus_blue.png" className="column-add-btn-icon" alt="Add" />
                        </button>
                    </div>
                    <div
                        className="board-column-body"
                        id={`board-${statusKey}-column`}
                        onDrop={() => console.log(`Move task to ${statusKey}`)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {tasks.filter((task) => task.status === statusKey)
                            .map((task) => (
                                <TaskCard key={task.id} task={task} contacts={contacts}/>
                        ))}
                        
                    </div>
                    </div>
                    );
                })}
                </div>

        {showAddTaskModal && (
            <div className="add-task-modal-bg" onClick={toggleAddTaskModal}>
            <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
                <div className="add-task-modal-header">
                <h1>Add Task</h1>
                <img src="assets/img/close.png" className="close-task-form-icon" onClick={toggleAddTaskModal} alt="Close" />
                </div>
                <div> {/* Task form goes here */} </div>
            </div>
            </div>
        )}

        {/* <div className="task-added-modal" id="task-added-modal">
            Task added to board <img src="assets/img/board1.png" id="task-added-msg-img" alt="Board" />
        </div> */}
        </main>
    );
};

export default Board;
