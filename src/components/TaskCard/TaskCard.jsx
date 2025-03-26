import React from "react";
import "./../../index.css";
import "./TaskCard.css";


const TaskCard = ({ task, onDragStart, onClick }) => {
   
    const taskCategoryHTML = task.category ? `<span class="task-category">${task.category}</span>` : "";
    const subtasksHTML = task.subtasks ? (
        <div className="subtasks">
            {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="subtask">{subtask.title}</div>
            ))}
        </div>
    ) : null;
    const taskContactsHTML = task.contacts ? (
        <div className="contacts">
            {task.contacts.map((contact, index) => (
                <span key={index} className="task-contact">{contact}</span>
            ))}
        </div>
    ) : null;
    const taskPrioHTML = task.priority ? (
        <div className="task-priority">
            <span>{task.priority}</span>
        </div>
    ) : null;

    return (
        <div
            className="board-task-div"
            draggable={true}
            onDragStart={() => onDragStart(task.id)}
            onClick={() => onClick(task.id)}
        >
            {taskCategoryHTML}
            <span className="board-task-title">{task.title}</span>
            <span className="board-task-description">{task.description}</span>
            {subtasksHTML}
            <div className="board-task-bottom-div">
                <div className="board-task-contacts-div">
                    {taskContactsHTML}
                </div>
                {taskPrioHTML}
            </div>
        </div>
    );
};

export default TaskCard;
