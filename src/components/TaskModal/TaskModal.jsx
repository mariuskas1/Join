import React from 'react';
import { useState } from 'react';
import "./../../index.css";
import "./TaskModal.css";
import { motion } from "framer-motion";
import EditTaskForm from '../EditTaskForm/EditTaskForm';



const TaskModal = ({ task, contacts, currentUser, setTasks, onClose, deleteTask, isOpen}) => {

    const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";
    const [showEditForm, setEditTask] = useState(false); 


    const renderPriority = (priority) => {
        switch(priority) {
            case 'low':
                return <td class="large-task-info-content"> <img className="large-prio-icon" src="assets/img/low.png" alt="Low priority" />Low</td>;
            case 'medium':
                return <td class="large-task-info-content"> <img className="large-prio-icon" src="assets/img/medium_orange.png" alt="Medium priority" />Medium</td> ;
            case 'urgent':
                return <td class="large-task-info-content"> <img className="large-prio-icon" src="assets/img/urgent.png" alt="Urgent priority" />Urgent</td>;
            default:
                return null;
        }
    };

    
    const renderAssignedContacts = () => {
        let assignedContacts = [];
        
        if (typeof task.assignedTo === "string") {
            assignedContacts = [task.assignedTo];
        } else if (Array.isArray(task.assignedTo)) {
            assignedContacts = task.assignedTo;
        }
    
        return assignedContacts.map((contactName, index) => {
            const assignedContactData = contacts.find(
                (contact) => contact.name === contactName
            );
            
           
            return assignedContactData ? (
                <div key={index} className="large-task-contact-div">
                    <div
                        className="large-task-contact-initials"
                        style={{ backgroundColor: assignedContactData.color }}
                    >
                        {assignedContactData.initials}
                    </div>
                    <span className="large-task-contact-name">{assignedContactData.name}</span>
                </div>
            ) : null; 
        });
    };

    const renderTaskCategory = () => {
        if (task.category === "User Story") {
            return <div className="large-task-category board-task-category-us">User Story</div>;
        }
        if (task.category === "Technical Task") {
            return <div className="large-task-category board-task-category-tt">Technical Task</div>;
        }
        return null;
    }


    const renderSubtasks = (subtasks) => {
        if (!subtasks || subtasks.length === 0) {
            return <p> - </p>;
        } else {
            return (
                <div id="large-task-subtasks-display">
                    {subtasks.map((subtask) => (
                        <div key={subtask.id} className="large-task-subtask-div">
                            <img
                                src={subtask.status === "done" ? "assets/img/checked.png" : "assets/img/notchecked.png"}
                                className="subtask-checkbox"
                                alt={subtask.status}
                                onClick={() => switchSubtaskStatus(subtask.id)}
                            />
                            <span className="large-task-subtask-name">{subtask.title}</span>
                        </div>
                    ))}
                </div>
            );
        }
    }


    const switchSubtaskStatus = async (id) => {
        const updatedTask = { ...task }; 
        const subtask = updatedTask.subtasks.find((subtask) => subtask.id === id);
    
        if (subtask) {
            subtask.status = subtask.status === 'todo' ? 'done' : 'todo';
    
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );

            await uploadEditedSubtask(subtask);
        }
    };
    

    const uploadEditedSubtask = async (subtask) => {
        try {
            await fetch(BASE_URL + "subtasks/" + subtask.id + '/', {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Token ${currentUser.token}`,
                },
                body: JSON.stringify(subtask)
            })
        } catch (error) {
            console.error(error)
        }
    }

    


    return(

        <motion.div
            initial={{ x: "300%" }} // Start off-screen
            animate={{ x: isOpen ? "0%" : "300%"}} // Slide in/out
            exit={{ x: "300%"}} // Exit animation
            transition={{ duration: 0.15, ease: "easeInOut" }} // Smooth transition
            className="task-display-large tdl-modal"
            onClick={(event) => event.stopPropagation()}
        >
            <div className="large-task-display-header">
                {renderTaskCategory()}
                <img 
                    src="assets/img/close.png" 
                    className="large-task-close-icon" 
                    onClick={onClose}
                    alt="Close"
                />
            </div>
            <span className="large-task-title">{task.title}</span>
            <span className="large-task-description">{task.description}</span>
            
            <table className="large-task-info-table">
                <tbody>
                    <tr>
                        <td className="large-task-info-description">Due date:</td>
                        <td className="large-task-info-content">{task.date}</td>
                    </tr>
                    <tr>
                        <td className="large-task-info-description">Priority:</td>
                        {renderPriority(task.prio)}
                    </tr>
                </tbody>
            </table>

            <span className="large-task-info-description">Assigned To:</span>
            <div className="large-task-contacts-display">
                {renderAssignedContacts(task.assignedTo)}
            </div>

            <span className="large-task-info-description" id="large-task-subtasks-header">Subtasks</span>
            <div className="large-task-subtasks-display" id="large-task-subtasks-display">
                {renderSubtasks(task.subtasks)}
            </div>

            <div className="large-task-display-footer">
                <button 
                    className="large-task-button" 
                    onClick={() => deleteTask(task.id)}
                >
                    <img className="task-footer-btn-icon" src="assets/img/delete.png" alt="Delete" />
                    Delete
                </button>
                <div className="large-task-btn-seperator"></div>
                <button 
                    className="large-task-button" 
                    onClick={() => setEditTask(true)}
                >
                    <img className="task-footer-btn-icon" src="assets/img/edit.png" alt="Edit" />
                    Edit
                </button>
            </div>
        </motion.div>

    );
};

export default TaskModal;