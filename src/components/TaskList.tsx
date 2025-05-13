import React from 'react';
import '../styles/TaskList.css';
import Task from '../types/Task';




const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
        <div className="task-list">
            <h2 className="task-list-title">📝 My Task List</h2>
            <ul className="task-items">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <h3>{task.title}</h3>
                        <p><strong>Note:</strong> {task.note}</p>
                        <p><strong>Completed:</strong> {task.completed ? "Yes" : "No"}</p>
                        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
