import React, { useState, useEffect } from "react";
import "../styles/page/TaskManagementPage.css";
import TaskList from "../components/task/TaskList";
import { useNavigate } from "react-router-dom";
import useTask from "../hooks/task/useTask";
import Task from "../types/Task";

const TaskManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { tasks: initialTasks } = useTask();
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
            </div>
            <button className="add-task-button" onClick={handleAddTaskClick}>+ Add New Task</button>
            <TaskList tasks={tasks} onDelete={handleDelete} />
        </div>
    );
};

export default TaskManagementPage;