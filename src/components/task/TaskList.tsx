import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/task/TaskList.css';
import Task from '../../types/Task';
import deleteTaskById from '../../hooks/task/deleteTask';
import DeleteTask from './DeleteTask';
import PriorityBadge from '../../components/task/PriorityBadge'; // Sửa đường dẫn import

const TaskList: React.FC<{
    tasks: Task[];
    onDelete?: (taskId: string) => void;
    emptyMessage?: string;
}> = ({
    tasks,
    onDelete,
    emptyMessage = "Không có công việc nào"
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
                alert('Xóa thất bại!');
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

        // Xử lý trường hợp không có công việc
        if (!tasks || tasks.length === 0) {
            return (
                <div className="task-list empty-list">
                    <h2 className="task-list-title">📝 Danh sách công việc</h2>
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <p>{emptyMessage}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="task-list">
                <h2 className="task-list-title">📝 Danh sách công việc</h2>
                <ul className="task-items">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            <h3>{task.title}</h3>
                            <p><strong>Ghi chú:</strong> {task.note}</p>
                            <p><strong>Hoàn thành:</strong> {task.completed ? "Có" : "Không"}</p>
                            <p><strong>Hạn chót:</strong> {new Date(task.deadline).toLocaleString('vi-VN')}</p>
                            <p>
                                <strong>Thể loại:</strong> <span className="category-name">{task.category?.name || 'Không có'}</span>
                            </p>
                            <p>
                                <strong>Mức độ ưu tiên:</strong> <PriorityBadge priority={task.status} />
                            </p>
                            <div className="task-actions">
                                <button className="edit-btn" onClick={() => handleEdit(task.id)}>Sửa</button>
                                <button className="delete-btn" onClick={() => openDeleteModal(task.id)}>Xóa</button>
                            </div>
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