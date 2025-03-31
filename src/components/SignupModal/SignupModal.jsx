import React from 'react'
import './SignupModal.css'
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";



const SignupModal = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '400%' }}  // Modal starts from bottom
          animate={{ y: isOpen ? 0 : '400%' }}  // Animate based on isOpen state
          exit={{ y: '400%' }}  // Exit by sliding down
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="sign-up-modal"
          id="sign-up-modal"
        >
          <div
            className="sign-up-modal-content"
            onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
          >
            You Signed Up successfully
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SignupModal
