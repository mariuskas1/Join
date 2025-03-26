import React from 'react';


const TaskModal = ({ task, hideTaskDisplayModal, deleteTask, displayEditTaskModal}) => {


    const renderPriority = (priority) => {
        switch(priority) {
            case 'low':
                return <img src="assets/img/low.png" alt="Low priority" />;
            case 'medium':
                return <img src="assets/img/medium_orange.png" alt="Medium priority" />;
            case 'urgent':
                return <img src="assets/img/urgent.png" alt="Urgent priority" />;
            default:
                return null;
        }
    };

    
    const renderAssignedContacts = (contacts) => {
        return contacts.map((contact, index) => (
            <div key={index} className="board-task-contact-logo" style={{ backgroundColor: contact.color }}>
                {contact.initials}
            </div>
        ));
    };

    return(

        <div 
            className="task-display-large" 
            onClick={(event) => event.stopPropagation()} 
            id="tdl-modal"
        >
            <div className="large-task-display-header">
                {/* You can replace 'taskCategoryHTML' with actual logic here */}
                <div className="task-category">{task.category}</div>
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
                        <td>{renderPriority(task.priority)}</td>
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