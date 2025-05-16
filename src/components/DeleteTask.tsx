import React from 'react';
import "../styles/DeleteTask.css";
interface DeleteTaskProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-task-modal">
            <div className="delete-task-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this task?</p>
                <div className="delete-task-actions">
                    <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTask;