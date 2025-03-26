import React from 'react';
import "./../../index.css";
import "./TaskModal.css";


const TaskModal = ({ task, contacts, hideTaskDisplayModal, deleteTask, displayEditTaskModal}) => {


    const renderPriority = (priority) => {
        console.log(priority);

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
                <div
                    key={index}
                    className="board-task-contact-logo"
                    style={{ backgroundColor: assignedContactData.color }}
                >
                    {assignedContactData.initials}
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

    return(

        <div 
            className="task-display-large" 
            onClick={(event) => event.stopPropagation()} 
            id="tdl-modal"
        >
            <div className="large-task-display-header">
                {renderTaskCategory()}
                <img 
                    src="assets/img/close.png" 
                    className="large-task-close-icon" 
                    onClick={hideTaskDisplayModal}
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
                {/* Render subtasks here */}
                {task.subtasks && task.subtasks.length > 0 ? (
                    task.subtasks.map((subtask, index) => (
                        <div key={index} className="subtask">
                            {subtask.title}
                        </div>
                    ))
                ) : (
                    <div>No subtasks</div>
                )}
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
                    onClick={() => displayEditTaskModal(task.id)}
                >
                    <img className="task-footer-btn-icon" src="assets/img/edit.png" alt="Edit" />
                    Edit
                </button>
            </div>
        </div>

    );
};

export default TaskModal;