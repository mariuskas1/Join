import React from 'react'
import "./../../index.css";
import "./AddTaskModal.css";
import TaskForm from '../TaskForm/TaskForm';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';


const AddTaskModal = ({ isOpen, onClose, contacts, currentUserData, taskStatus, taskAdded }) => {
   

  
    return ReactDOM.createPortal(
        <>
        <div className="add-task-modal-bg" onClick={onClose}></div>

        <motion.div
            initial={{ x: "200%" }}
            animate={{ x: isOpen ? "0%" : "200%" }}
            exit={{ x: "200%" }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="add-task-modal"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="add-task-modal-header">
                <h1>Add Task</h1>
                <img
                    src="assets/img/close.png"
                    className="close-task-form-icon"
                    onClick={onClose} 
                    alt="Close"
                />
            </div>

            <TaskForm
                contacts={contacts}
                currentUserData={currentUserData}
                taskStatus={taskStatus}
                onTaskAdded={taskAdded}
            />
        </motion.div>
        </>,
        document.getElementById('portal') 
    );
  };
  
  export default AddTaskModal;
