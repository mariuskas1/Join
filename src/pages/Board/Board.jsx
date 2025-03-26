import React from 'react';
import { useState, useEffect, useRef } from "react";
import "./Board.css";
import "../../index.css";
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskModal from '../../components/TaskModal/TaskModal';

const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";


const Board = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const handleSearch = (e) => setSearchQuery(e.target.value);
    const toggleAddTaskModal = () => setShowAddTaskModal(!showAddTaskModal);

    const [currentUser, setCurrentUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [openedTask, setOpenedTask] = useState(null);
    const [draggedTaskId, setDraggedTaskId] = useState(null);

    const [hoveredColumn, setHoveredColumn] = useState(null);
    const columnRef = useRef({});


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
    
    const openTaskModal = (task) => {
        console.log(task);
        setOpenedTask(task);
    };

    const closeTaskModal = () => {
        setOpenedTask(null); 
    };

    const startDragging = (id) => {
        setDraggedTaskId(id);
    }

    const moveToColumn = (statusKey) => (event) => {
        event.preventDefault(); 
        removeHighlightForAllColumns();
        moveTo(statusKey); 
    };
    

    const removeHighlightForAllColumns = () => {
        setHoveredColumn(null);

        Object.keys(columnRef.current).forEach((key) => {
            if (columnRef.current[key]) {
                columnRef.current[key].classList.remove('drag-area-highlight');
            }
        });
    } 

    const moveTo = async (status) => {
        const task = tasks.find((task) => task.id === draggedTaskId);
        if (task) {
            task.status = status; 
            const taskToSend = { ...task };  
            delete taskToSend.subtasks;  
            await editTaskOnMoving(taskToSend); 
            setDraggedTaskId(null); 
        }
    }

    const editTaskOnMoving = async (task) => {
        try {
            await fetch(BASE_URL + 'tasks/' + task.id + '/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${currentUser.token}`,
                },
                body: JSON.stringify(task),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const allowDrop = (ev) => {
        ev.preventDefault();
    };

    const highlight = (status) => {
        setHoveredColumn(status);

        if (columnRef.current[status]) {
            columnRef.current[status].classList.add('drag-area-highlight');
        }
        
    };

    const removeHighlight = (status) => {
        if (columnRef.current[status]) {
            columnRef.current[status].classList.remove('drag-area-highlight');
        }

        setHoveredColumn(null);
    };
       

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
                        ref={(el) => columnRef.current[statusKey] = el}
                        id={`board-${statusKey}-column`}
                        onDrop={moveToColumn(statusKey)}
                        onDragOver={(e) => {
                            allowDrop(e); 
                            highlight(statusKey); 
                        }}
                        onDragLeave={() => removeHighlight(statusKey)}
                    >
                        {tasks.filter((task) => task.status === statusKey)
                            .map((task) => (
                                <TaskCard key={task.id} task={task} contacts={contacts} openTaskModal={openTaskModal} startDragging={startDragging} />
                        ))}
                        
                    </div>
                    </div>
                    );
                })}
                </div>

        {openedTask && (
            <div className='task-display-modal-bg' onClick={closeTaskModal}>
                <TaskModal task={openedTask} contacts={contacts} onClose={closeTaskModal} currentUser={currentUser} setTasks={setTasks} />
            </div>
        )}

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
