import React, { useState, useEffect } from "react";
import "../styles/TaskManagementPage.css";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import useTask from "../hooks/useTask";
import Task from "../types/Task";

const TaskManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { tasks: initialTasks, error } = useTask();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const handleAddTaskClick = () => {
        navigate("/AddTask");
    };

    const handleDelete = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return (
        <div className="task-management-page">
            <div className="task-header">
                <h1>Task Management</h1>
                {error && <p className="error-message">{error}</p>}
                <p>Efficiently manage and organize your tasks.</p>
            </div>
            <button className="add-task-button" onClick={handleAddTaskClick}>+ Add New Task</button>
            <TaskList tasks={tasks} onDelete={handleDelete} />
        </div>
    );
};

export default TaskManagementPage;