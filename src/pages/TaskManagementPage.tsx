import React from "react";
import "../styles/TaskManagementPage.css"; // Import CSS riêng cho trang
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import useTask from "../hooks/useTask";

const TaskManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { tasks, error } = useTask();
    const handleAddTaskClick = () => {
        navigate("/AddTask");
    };



    return (
        <div className="task-management-page">
            <div className="task-header">
                <h1>Task Management</h1>
                {error && <p className="error-message">{error}</p>}
                <p>Efficiently manage and organize your tasks.</p>
            </div>
            <button className="add-task-button" onClick={handleAddTaskClick}>+ Add New Task</button>
            <ul>
                <TaskList tasks={tasks} />
            </ul>
        </div>
    );
};

export default TaskManagementPage;