import React, { useState, useEffect } from 'react';
import '../styles/AddTask.css';
import Category from '../types/Category';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTaskById, fetchAllCategories, updateTaskById } from '../hooks/editTask';
import UpdateTaskById from '../types/updatedTask';

const EditTask: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [completed, setCompleted] = useState(false);
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('MEDIUM');
    const [categoryId, setCategoryId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetchTaskById(
                id,
                setTask,
                setTitle,
                setNote,
                setCompleted,
                setDeadline,
                setStatus,
                setCategoryId
            );
            fetchAllCategories(setCategories);
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTask: UpdateTaskById = {
            title,
            note,
            completed,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            status,
            categoryId
        };

        try {
            const response = await updateTaskById(id as string, updatedTask);
            if (response.ok) {
                setSuccessMessage('Task updated successfully!');
                setTimeout(() => navigate('/TaskManagement'), 1000);
            } else {
                setSuccessMessage('Failed to update task!');
            }
        } catch (error) {
            alert('Error updating task!');
        }
    };

    if (!task) {
        return <div style={{ padding: 24 }}>Loading...</div>;
    }

    return (
        <div className="add-task-form">
            <h2>Edit Task</h2>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="task-title">Title:</label>
                    <input
                        type="text"
                        id="task-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="task-note">Note:</label>
                    <textarea
                        id="task-note"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="task-deadline">Deadline:</label>
                    <input
                        type="datetime-local"
                        id="task-deadline"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="task-status">Status:</label>
                    <select
                        id="task-status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="task-category">Category:</label>
                    <select
                        id="task-category"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="task-completed">Completed:</label>
                    <input
                        type="checkbox"
                        id="task-completed"
                        checked={completed}
                        onChange={e => setCompleted(e.target.checked)}
                    />
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;