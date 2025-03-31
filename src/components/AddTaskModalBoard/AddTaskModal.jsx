import React from 'react'
import "./../../index.css";
import "./AddTaskModal.css";
import TaskForm from '../TaskForm/TaskForm';


const AddTaskModal = ({ isOpen, onClose, contacts, currentUserData, taskStatus }) => {
    if (!isOpen) return null;
  
    return (
        <div className="add-task-modal-bg" onClick={toggleAddTaskModal}>
        <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="add-task-modal-header">
            <img src="assets/img/close.png" className="close-task-form-icon" onClick={toggleAddTaskModal} alt="Close" />
            </div>
            <TaskForm contacts={contacts} currentUserData={currentUserData} taskStatus={taskStatus}> </TaskForm>
        </div>
        </div>
    );
  };
  
  export default AddTaskModal;
