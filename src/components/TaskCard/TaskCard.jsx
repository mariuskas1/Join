import React from "react";
import "./../../index.css";
import "./TaskCard.css";


const TaskCard = ({ task, contacts, onDragStart, onClick }) => {
   
   
    const subtasksHTML = task.subtasks ? (
        <div className="subtasks">
            {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="subtask">{subtask.title}</div>
            ))}
        </div>
    ) : null;

    const taskPrioHTML = task.priority ? (
        <div className="task-priority">
            <span>{task.priority}</span>
        </div>
    ) : null;

    const renderTaskContacts = () => {
        let assignedContacts = [];
        if (typeof task.assignedTo === "string") {
            assignedContacts = [task.assignedTo];
        }
    
        return assignedContacts.map((contactName, index) => {
            const assignedContactData = contacts.find(
                (contact) => contact.name === contactName
            );
    
            return assignedContactData ? (
                <div
                    key={index}
                    className="board-task-contact-logo"
                    style={{ backgroundColor: assignedContactData.color }}
                >
                    {assignedContactData.initials}
                </div>
            ) : null;
        });
    }
    

    return (
        <div
            className="board-task-div"
            draggable={true}
            onDragStart={() => onDragStart(task.id)}
            onClick={() => onClick(task.id)}
        >
            {task.category === "User Story" && (
                <span className="board-task-category-div" id="board-task-category-us">User Story</span>
            )}
            {task.category === "Technical Task" && (
                <span className="board-task-category-div" id="board-task-category-tt">Technical Task</span>
            )}

            <span className="board-task-title">{task.title}</span>
            <span className="board-task-description">{task.description}</span>
            {subtasksHTML}
            <div className="board-task-bottom-div">
                <div className="board-task-contacts-div">
                    {task.assignedTo && renderTaskContacts()}
                </div>
                {taskPrioHTML}
            </div>
        </div>
    );
};

export default TaskCard;
