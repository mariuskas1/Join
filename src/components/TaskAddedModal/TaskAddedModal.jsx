import React from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from "framer-motion";
import './TaskAddedModal.css'; 


const TaskAddedModal = ({ isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '400%' }} 
                    animate={{ y: 0 }} 
                    exit={{ y: '400%' }} 
                    transition={{ duration: 0.15, ease: 'easeInOut' }} 
                    className="task-added-modal"
                    id="task-added-modal"
                >
                    Task added to board <img src="assets/img/board1.png" id="task-added-msg-img" alt="board"/>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskAddedModal;