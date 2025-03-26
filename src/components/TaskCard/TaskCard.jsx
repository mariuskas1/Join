import React from "react";
import "./../../index.css";
import "./TaskCard.css";


const TaskCard = ({ task, contacts, onDragStart, onClick }) => {
   
   
    const renderSubtaskDisplay = (subtasks) => {
        if (subtasks.length > 0) {
            let subtasksArray = Object.values(subtasks); 
            let allSubtasks = subtasksArray.length;
            let subtasksDone = subtasksArray.filter(subtask => subtask.status === "done").length;
            let subtasksDoneInPercent = (subtasksDone / allSubtasks) * 100;
    
            return getSubtaskProgressTemplate(subtasksDoneInPercent, subtasksDone, allSubtasks);
        } else {
            return null;
        }
    }

    const getSubtaskProgressTemplate = (subtasksDoneInPercent, subtasksDone, allSubtasks) => {
        return (
            <div className="board-task-subtasks-display">
                <div className="board-subtasks-bar-container">
                    <div
                        className="board-subtasks-bar"
                        style={{ width: `${subtasksDoneInPercent}%` }} 
                    ></div>
                </div>
                <span className="board-subtasks-display">
                    {subtasksDone}/{allSubtasks} Subtasks
                </span>
            </div>
        );
    }
    

    const renderTaskPrioDisplay = (prio) => {
        const prioImages = {
            low: "assets/img/low.png",
            medium: "assets/img/medium_orange.png",
            urgent: "assets/img/urgent.png",
        };
    
        return prioImages[prio] ? (
            <img className="board-task-urgency" src={prioImages[prio]} alt={prio} />
        ) : null;
    };

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
            {renderSubtaskDisplay(task.subtasks)}
            <div className="board-task-bottom-div">
                <div className="board-task-contacts-div">
                    {task.assignedTo && renderTaskContacts()}
                </div>
                {task.prio && renderTaskPrioDisplay(task.prio)}
            </div>
        </div>
    );
};

export default TaskCard;
