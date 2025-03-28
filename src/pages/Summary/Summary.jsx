import React, { useEffect, useState } from "react";
import "./Summary.css";
import "../../index.css";
import { getCurrentUserData } from "../../services/apiService";

const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/tasks/";



const Summary = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [allTasks, setAllTasks] = useState([]);
    const [greeting, setGreeting] = useState("");
    const [taskCounts, setTaskCounts] = useState({
        todo: 0,
        done: 0,
        urgent: 0,
        inBoard: 0,
        inProgress: 0,
        awaitingFeedback: 0,
    });

    useEffect(() => {
            const userData = getCurrentUserData();
            setCurrentUser(userData);
    }, []);
       

    useEffect(() => {
        if (currentUser) {
            getAllTasks();
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            displayGreeting();
        }
    }, [currentUser]);

    

    const getAllTasks = async () => {
        try {
            const response = await fetch(BASE_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${currentUser.token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if (data.length === 0) {
                displayZeroTasks();
            } else {
                setAllTasks(data);
                displayTaskInfos(data);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            displayZeroTasks();
        }
    };

    const displayZeroTasks = () => {
        setTaskCounts({
            todo: 0,
            done: 0,
            urgent: 0,
            inBoard: 0,
            inProgress: 0,
            awaitingFeedback: 0,
        });
    };

    const displayTaskInfos = (tasks) => {
        const numberOfUrgentTasks = tasks.filter((task) => task.prio === "urgent").length;
        const numberOfTasksTodo = tasks.filter((task) => task.status === "todo").length;
        const numberOfTasksDone = tasks.filter((task) => task.status === "done").length;
        const numberOfTasksInProgress = tasks.filter((task) => task.status === "in_progress").length;
        const numberOfTasksAwaitingFeedback = tasks.filter((task) => task.status === "await_feedback").length;

        setTaskCounts({
            todo: numberOfTasksTodo,
            done: numberOfTasksDone,
            urgent: numberOfUrgentTasks,
            inBoard: tasks.length,
            inProgress: numberOfTasksInProgress,
            awaitingFeedback: numberOfTasksAwaitingFeedback,
        });
    };

    const getClosestDeadline = () => {
        if (allTasks.length === 0) {
            return null; // Or handle case where there are no tasks
        }
        let taskDates = allTasks.map((task) => new Date(task.date));
        let currentDate = new Date();
        let closestDeadline = taskDates.reduce((closest, date) => {
            return Math.abs(date - currentDate) < Math.abs(closest - currentDate) ? date : closest;
        });
        return closestDeadline.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const displayGreeting = () => {
        const currentHour = new Date().getHours();
        let greetingText = "";
        if (currentHour < 12) {
            greetingText = "Good morning,";
        } else if (currentHour < 18) {
            greetingText = "Good afternoon,";
        } else {
            greetingText = "Good evening,";
        }

        if (currentUser && currentUser.isGuest) {
            greetingText = greetingText.slice(0, -1) + "!"; 
        } else if (currentUser && currentUser.name) {
            greetingText = `${greetingText} ${currentUser.name}`; 
        }

        setGreeting(greetingText);
    };


    return (
        <main>
        <div className="summary-header">
            <h1>Join 360</h1>
            <div className="summary-header-bar"></div>
            <span className="summary-subtitle">Key Metrics at a Glance</span>
            <div className="summary-header-bar-mobile"></div>
        </div>

        <div className="summary-main">
            <div className="summary-infos">
                <div className="summary-info-row">
                    <div className="summary-info-box-row-1">
                        <img src="assets/img/summary-edit.png" className="summary-icon" />
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.todo}</span>
                            <span className="summary-description">To-do</span>
                        </div>
                    </div>
                    <div className="summary-info-box-row-1">
                        <img src="assets/img/summary-check.png" className="summary-icon" />
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.done}</span>
                            <span className="summary-description">Done</span>
                        </div>
                    </div>
                </div>
                <div className="summary-info-row">
                    <div className="summary-info-box-row-2">
                        <img src="assets/img/summary-urgent.png" className="summary-icon-row-2" />
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.urgent}</span>
                            <span className="summary-row-2-description">Urgent</span>
                        </div>
                        <div className="summary-row-2-bar"></div>
                        <div className="summary-row-2-details">
                            <span className="summary-row-2-date">{getClosestDeadline()}</span>
                            <span className="summary-row-2-subtitle">Upcoming Deadline</span>
                        </div>
                    </div>
                </div>
                <div className="summary-info-row">
                    <div className="summary-info-box-row-3">
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.inBoard}</span>
                            <span className="summary-description">Tasks in Board</span>
                        </div>
                    </div>
                    <div className="summary-info-box-row-3">
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.inProgress}</span>
                            <span className="summary-description">Tasks in Progress</span>
                        </div>
                    </div>
                    <div className="summary-info-box-row-3">
                        <div className="summary-row-info">
                            <span className="summary-digit">{taskCounts.awaitingFeedback}</span>
                            <span className="summary-description">Awaiting Feedback</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary-greeting">
                <span className="greeting-daytime">{greeting}</span>
                <span className="greeting-name">{currentUser ? currentUser.name : "Guest"}</span>
            </div>
        </div>

        <div className="summary-greeting-mobile">
            <span className="greeting-daytime">{greeting}</span>
            <span className="greeting-name">{currentUser ? currentUser.name : "Guest"}</span>
        </div>
      </main>
    );
  };
  
  export default Summary;