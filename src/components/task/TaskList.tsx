import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/task/TaskList.css';
import Task from '../../types/Task';
import deleteTaskById from '../../hooks/task/deleteTask';
import DeleteTask from './DeleteTask';
import PriorityBadge from '../../components/task/PriorityBadge';

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
        const [sortByPriority, setSortByPriority] = useState(true); // Mặc định sắp xếp theo mức ưu tiên
        const [showOnlyCompleted, setShowOnlyCompleted] = useState(false); // Mặc định hiển thị tất cả task
        const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false); // Mặc định hiển thị tất cả task

        // State để lưu danh sách đã được lọc & sắp xếp
        const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

        // Cập nhật danh sách task dựa trên bộ lọc
        useEffect(() => {
            if (!tasks) return;

            let result = [...tasks];

            // Lọc theo hoàn thành
            if (showOnlyCompleted) {
                result = result.filter(task => task.completed);
                // Bỏ chọn showOnlyIncomplete nếu showOnlyCompleted được chọn
                if (showOnlyIncomplete) {
                    setShowOnlyIncomplete(false);
                }
            }
            // Lọc theo chưa hoàn thành
            else if (showOnlyIncomplete) {
                result = result.filter(task => !task.completed);
            }

            // Sắp xếp theo mức độ ưu tiên nếu được chọn
            if (sortByPriority) {
                result.sort((a, b) => {
                    const priorityOrder: { [key: string]: number } = {
                        'HIGH': 1,
                        'MEDIUM': 2,
                        'LOW': 3
                    };
                    return priorityOrder[a.status] - priorityOrder[b.status];
                });
            }

            setFilteredTasks(result);
        }, [tasks, sortByPriority, showOnlyCompleted, showOnlyIncomplete]);

        // Handler để xử lý khi người dùng chọn "Đã hoàn thành"
        const handleCompletedFilter = () => {
            setShowOnlyCompleted(!showOnlyCompleted);
            if (!showOnlyCompleted) {
                setShowOnlyIncomplete(false); // Bỏ chọn "Chưa hoàn thành" nếu đang chọn "Đã hoàn thành"
            }
        };

        // Handler để xử lý khi người dùng chọn "Chưa hoàn thành"
        const handleIncompleteFilter = () => {
            setShowOnlyIncomplete(!showOnlyIncomplete);
            if (!showOnlyIncomplete) {
                setShowOnlyCompleted(false); // Bỏ chọn "Đã hoàn thành" nếu đang chọn "Chưa hoàn thành"
            }
        };

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

                {/* Thêm phần lọc và sắp xếp */}
                <div className="task-filters">
                    <div className="filter-group">
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={sortByPriority}
                                onChange={() => setSortByPriority(!sortByPriority)}
                            />
                            <span>Sắp xếp theo mức độ ưu tiên</span>
                        </label>
                    </div>

                    <div className="filter-options">
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={showOnlyCompleted}
                                onChange={handleCompletedFilter}
                            />
                            <span>Chỉ hiển thị công việc đã hoàn thành</span>
                        </label>

                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={showOnlyIncomplete}
                                onChange={handleIncompleteFilter}
                            />
                            <span>Chỉ hiển thị công việc chưa hoàn thành</span>
                        </label>
                    </div>
                </div>

                {/* Hiển thị số lượng task */}
                <div className="task-count">
                    <span>Tổng số: <strong>{filteredTasks.length}</strong> công việc</span>
                </div>

                {/* Kiểm tra nếu không còn task nào sau khi lọc */}
                {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <p>Không tìm thấy công việc nào phù hợp với bộ lọc</p>
                    </div>
                ) : (
                    <ul className="task-items">
                        {filteredTasks.map((task) => (
                            <li key={task.id} className={`task-item priority-${task.status.toLowerCase()}`}>
                                <h3>{task.title}</h3>
                                <p><strong>Ghi chú:</strong> {task.note}</p>
                                <p><strong>Hoàn thành:</strong> {task.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}</p>
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
                )}

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