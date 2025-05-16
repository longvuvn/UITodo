import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskList.css';
import Task from '../types/Task';
import deleteTaskById from '../hooks/deleteTask';
import DeleteTask from './DeleteTask';
const TaskList: React.FC<{ tasks: Task[]; onDelete?: (taskId: string) => void }> = ({
    tasks,
    onDelete,
}) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const handleEdit = (taskId: string) => {
        navigate(`/EditTask/${taskId}`);
    };

    const handleDeleteTask = async (id: string) => {
        const response = await deleteTaskById(id);
        if (response.ok) {
            if (onDelete) onDelete(id);
        } else {
            alert('Delete failed!');
        }
        setShowDeleteModal(false);
        setSelectedTaskId(null);
    };
    const openDeleteModal = (id: string) => {
        setSelectedTaskId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedTaskId(null);
    };

    return (
        <div className="task-list">
            <h2 className="task-list-title">📝 My Task List</h2>
            <ul className="task-items">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <h3>{task.title}</h3>
                        <p><strong>Note:</strong> {task.note}</p>
                        <p><strong>Hoàn thành:</strong> {task.completed ? "Yes" : "No"}</p>
                        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
                        <p>
                            <strong>Thể loại:</strong> {task.category?.name}
                        </p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                        <button className="delete-btn" onClick={() => openDeleteModal(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {showDeleteModal && selectedTaskId && (
                <DeleteTask
                    onConfirm={() => handleDeleteTask(selectedTaskId)}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
};

export default TaskList;