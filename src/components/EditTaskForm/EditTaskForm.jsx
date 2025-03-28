import React from 'react';
import { useState, useEffect, useRef } from 'react';
import "./../../index.css";
import "../../pages/Board/Board.css";
import "./EditTaskForm.css";



const EditTaskForm = ({ task, contacts, currentUser, hideForm }) => {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const [priority, setPriority] = useState(task.prio);
    const [assignedTo, setAssignedTo] = useState(task.assignedTo);
    const [subtasks, setSubtasks] = useState(task.subtasks);
    const [newSubtask, setNewSubtask] = useState({
        title: '',
        status: 'todo',
        task: task.id
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setDate(task.date);
        setPriority(task.prio);
        setAssignedTo(task.assignedTo);
        setSubtasks(task.subtasks);
    }, [task]);

    const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";
    
    useEffect(() => {
        if (editingIndex !== null && inputRef.current) {
          inputRef.current.focus();
        }
        console.log(subtasks);
    }, [editingIndex]);
    
    const handleAddSubtaskChange = (event) => {
        setNewSubtask((prev) => ({
            ...prev,
            title: event.target.value
        }));
    };
    
    const handleSubtaskKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          addSubtask();
        }
    };
    
    const addSubtask = () => {
        if (newSubtask.title.trim() !== '') {
            setSubtasks([...subtasks, newSubtask]);    
            setNewSubtask({
                title: '',
                status: 'todo',
                task: task.id
            });
        }
    };
    
    const handleSubtaskChange = (index, event) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index] = event.target.value;
        setSubtasks(updatedSubtasks);
    };
    
    const handleSubtaskBlur = () => {
        setEditingIndex(null);
    };
    
    const deleteSubtask = async (index) => {
        const subtaskToDelete = subtasks[index];
        if (subtaskToDelete.id) {
            await deleteSubtaskFromServer(subtaskToDelete.id);
            const updatedSubtasks = subtasks.filter((_, i) => i !== index);
            setSubtasks(updatedSubtasks);
            task.subtasks = updatedSubtasks;
        } else {
            const updatedSubtasks = subtasks.filter((_, i) => i !== index);
            setSubtasks(updatedSubtasks);
            task.subtasks = updatedSubtasks;
        }
    };

    const deleteSubtaskFromServer = async (id) => {
        try {
            await fetch(BASE_URL + `subtasks/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${currentUser.token}`,
                },
            });
        } catch (error) {
            console.error("Error deleting subtask:", error);
        }
    }
    

    const editTask = async (event) => {
        event.preventDefault();
        updateTaskObject();
        
        const taskToSend = { 
            id: task.id, 
            title, 
            description, 
            date, 
            prio: priority, 
            assignedTo,
            status: task.status,
            category: task.category
        };
        await editRequest(taskToSend); 
        await editSubtasks();
        hideForm();
    };

    const updateTaskObject = () => {
        task.title = title;
        task.description = description;
        task.date = date;
        task.prio = priority;
        task.assignedTo = assignedTo;

    }

    const editRequest = async (taskToSend) => {
        try {
            await fetch(BASE_URL + 'tasks/' + task.id + '/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${currentUser.token}`,
                },
                body: JSON.stringify(taskToSend),
            });
        } catch (error) {
            console.error(error);
        }
    }

    const editSubtasks = async () => {
        const newSubtasks = [];
        try {
            await Promise.all(
                subtasks.map(subtask => {
                    if (subtask.id) {
                        return fetch(BASE_URL + `subtasks/${subtask.id}/`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Token ${currentUser.token}`,
                            },
                            body: JSON.stringify(subtask),
                        });
                    } else {
                        newSubtasks.push(subtask);
                        return Promise.resolve(); 
                    }
                })
            );
            if (newSubtasks.length > 0) {
                await updateSubtasksOnServerAndUI(newSubtasks);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateSubtasksOnServerAndUI = async (newSubtasks) => {
        if (newSubtasks.length > 0) {
            await addNewSubtasks(newSubtasks);
        }

        setSubtasks(prevSubtasks => [...prevSubtasks, ...newSubtasks]);
        task.subtasks = [...task.subtasks, ...newSubtasks];
    }


    const addNewSubtasks = async (newSubtasks) => {
        try {
            await Promise.all(
                newSubtasks.map(subtask =>
                    fetch(BASE_URL + `subtasks/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${currentUser.token}`,
                        },
                        body: JSON.stringify(subtask), 
                    })
                )
            );
        } catch (error) {
            console.error(error);
        }
    };



    return(
        <div className='edit-task-div' onClick={(event) => event.stopPropagation()} >
            <div className="edit-task-display-header">
                <img
                    src="assets/img/close.png"
                    className="large-task-close-icon"
                    onClick={hideForm}
                    alt="Close"
                />
            </div>
            <div className="edit-task-content">
                <form id="edit-task-form" onSubmit={editTask}>
                    <div className="edit-task-modal-body">
                        <div className="input">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="edit-task-input"
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                spellCheck="false"
                                required
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                spellCheck="false"
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="date">Due date</label>
                            <input
                                type="date"
                                className="edit-task-input"
                                id="edit-date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                min="2010-01-01"
                                max="2100-12-31"
                            />
                        </div>
                        <div className="input">
                            <span>Prio</span>
                            <div className="prio-btns">
                                <div className="input-container">
                                    <input
                                        type="radio"
                                        id="urgent"
                                        name="prio-edit"
                                        value="urgent"
                                        checked={priority === "urgent"}
                                        onChange={() => setPriority("urgent")}
                                    />
                                    <div className="radio-tile" id="urgent-tile">
                                        <label htmlFor="urgent">Urgent</label>
                                        <img src="assets/img/urgent.png" alt="Urgent" />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="radio"
                                        id="medium"
                                        name="prio-edit"
                                        value="medium"
                                        checked={priority === "medium"}
                                        onChange={() => setPriority("medium")}
                                    />
                                    <div className="radio-tile" id="medium-tile">
                                        <label htmlFor="medium">Medium</label>
                                        <img src="assets/img/medium.png" alt="Medium" />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="radio"
                                        id="low"
                                        name="prio-edit"
                                        value="low"
                                        checked={priority === "low"}
                                        onChange={() => setPriority("low")}
                                    />
                                    <div className="radio-tile" id="low-tile">
                                        <label htmlFor="low">Low</label>
                                        <img src="assets/img/low.png" alt="Low" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <label htmlFor="assigned">Assigned to</label>
                            <select
                                id="edit-assigned"
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                            >
                                <option value="" disabled>Select contacts to assign</option>
                                {/* Dynamically populate options */}
                            </select>
                        </div>
                        <div className="edit-task-assigned-contacts-display" id="edit-task-assigned-contacts-display">
                            {/* Render assigned contacts */}
                        </div>
                        <div className="input" id="subtasks-input">
                            <label htmlFor="subtasks">Subtasks</label>
                            <div className="subtask-input-container">
                                <input
                                    type="text"
                                    name="subtasks"
                                    id="subtasks-edit"
                                    placeholder="Add new subtask"
                                    value={newSubtask.title}
                                    onChange={handleAddSubtaskChange}
                                    onKeyDown={handleSubtaskKeyDown}
                                    spellCheck="false"
                                />
                                <img
                                    className="add-subtask-icon"
                                    src="assets/img/add.png"
                                    alt="Add Subtask"
                                    onClick={addSubtask}
                                />
                            </div>
                            <ul id="edit-task-subtasks-list">
                                {subtasks.map((subtask, index) => (
                                    <li key={index}>
                                        <img className="bullet-point" src="assets/img/circle-solid.svg" alt="Bullet point" />
                                        <input 
                                            ref={editingIndex === index ? inputRef : null}
                                            type="text" 
                                            className="subtask-input bg-white" 
                                            name="subtask-input" 
                                            value={subtask.title} 
                                            onChange={(event) => handleSubtaskChange(index, event)}
                                            onBlur={handleSubtaskBlur}
                                            disabled={editingIndex !== index}
                                            autoFocus={editingIndex === index}
                                            spellCheck="false"
                                        />
                                        <div className="subtask-icons">
                                            <img 
                                                className="subtask-icon" 
                                                src="assets/img/edit.png" 
                                                onClick={() => setEditingIndex(index)}
                                                alt="Edit"
                                            />
                                            <img 
                                                className="subtask-icon" 
                                                src="assets/img/delete.png" 
                                                onClick={() => deleteSubtask(index)}
                                                alt="Delete"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="edit-task-modal-footer">
                        <button className="edit-task-btn" type="submit">
                            Ok <img src="assets/img/check_white.png" alt="Submit" />
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default EditTaskForm;