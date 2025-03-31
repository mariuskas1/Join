import React from 'react'
import './SignupModal.css'
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";



const SignupModal = ({ isOpen, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '400%' }}  
          animate={{ y: isOpen ? 0 : '400%' }}  
          exit={{ y: '400%' }} 
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="sign-up-modal"
          id="sign-up-modal"
        >
          <div
            className="sign-up-modal-content"
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignupModal
