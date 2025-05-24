import React, { useState, useEffect } from 'react';
import '../../styles/task/AddTask.css';
import Category from '../../types/Category';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTaskById, fetchAllCategories, updateTaskById } from '../../hooks/task/editTask';
import UpdateTaskById from '../../types/UpdatedTask';

const EditTask: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // States for task data
    const [task, setTask] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [completed, setCompleted] = useState(false);
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('MEDIUM');
    const [categoryId, setCategoryId] = useState('');

    // States for UI
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadTaskData = async () => {
            if (!id) return;

            setIsLoading(true);
            try {
                await Promise.all([
                    fetchTaskById(
                        id,
                        setTask,
                        setTitle,
                        setNote,
                        setCompleted,
                        setDeadline,
                        setStatus,
                        setCategoryId
                    ),
                    fetchAllCategories(setCategories)
                ]);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setIsError(true);
                setMessage("Không thể tải thông tin công việc. Vui lòng thử lại sau.");
            } finally {
                setIsLoading(false);
            }
        };

        loadTaskData();
    }, [id]);

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!title.trim()) {
            errors.title = "Tiêu đề không được để trống";
        } else if (title.trim().length > 100) {
            errors.title = "Tiêu đề không được vượt quá 100 ký tự";
        }

        if (!note.trim()) {
            errors.note = "Ghi chú không được để trống";
        }

        if (!deadline) {
            errors.deadline = "Hạn chót không được để trống";
        }

        if (!categoryId) {
            errors.categoryId = "Vui lòng chọn thể loại";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setIsError(true);
            setMessage("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setIsSaving(true);
        setIsError(false);
        setMessage("");

        const updatedTask: UpdateTaskById = {
            title: title.trim(),
            note: note.trim(),
            completed,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            status,
            categoryId
        };

        try {
            const response = await updateTaskById(id as string, updatedTask);
            if (response.ok) {
                setIsError(false);
                setMessage('Cập nhật công việc thành công!');
                setTimeout(() => navigate('/TaskManagement'), 1500);
            } else {
                const errorData = await response.json().catch(() => null);
                setIsError(true);
                setMessage(errorData?.message || 'Lỗi khi cập nhật công việc!');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Lỗi hệ thống! Vui lòng thử lại sau.');
            console.error('Error updating task:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/TaskManagement');
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Đang tải thông tin công việc...</p>
            </div>
        );
    }

    if (isError && !task) {
        return (
            <div className="error-container">
                <h3>Có lỗi xảy ra</h3>
                <p>{message}</p>
                <button onClick={() => navigate('/TaskManagement')} className="back-button">
                    Quay lại danh sách công việc
                </button>
            </div>
        );
    }

    return (
        <div className="add-task-container">
            <div className="add-task-form">
                <h2>Chỉnh sửa công việc</h2>

                {message && (
                    <div className={`message-box ${isError ? 'error-message' : 'success-message'}`}>
                        <span className="message-icon">
                            {isError ? '⚠️' : '✓'}
                        </span>
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="task-title">Tiêu đề: <span className="required">*</span></label>
                        <input
                            type="text"
                            id="task-title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={validationErrors.title ? 'input-error' : ''}
                            required
                            maxLength={100}
                        />
                        {validationErrors.title && (
                            <span className="error-text">{validationErrors.title}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-note">Ghi chú: <span className="required">*</span></label>
                        <textarea
                            id="task-note"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            className={validationErrors.note ? 'input-error' : ''}
                            required
                            rows={4}
                        ></textarea>
                        {validationErrors.note && (
                            <span className="error-text">{validationErrors.note}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-deadline">Hạn chót: <span className="required">*</span></label>
                        <input
                            type="datetime-local"
                            id="task-deadline"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                            className={validationErrors.deadline ? 'input-error' : ''}
                            required
                        />
                        {validationErrors.deadline && (
                            <span className="error-text">{validationErrors.deadline}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-status">Mức độ ưu tiên:</label>
                        <select
                            id="task-status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            required
                        >
                            <option value="LOW">Thấp</option>
                            <option value="MEDIUM">Trung bình</option>
                            <option value="HIGH">Cao</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-category">Thể loại: <span className="required">*</span></label>
                        <select
                            id="task-category"
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className={validationErrors.categoryId ? 'input-error' : ''}
                            required
                        >
                            <option value="">-- Chọn thể loại --</option>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))
                            ) : (
                                <option value="" disabled>Không có thể loại nào</option>
                            )}
                        </select>
                        {validationErrors.categoryId && (
                            <span className="error-text">{validationErrors.categoryId}</span>
                        )}
                        {Array.isArray(categories) && categories.length === 0 && (
                            <span className="warning-text">
                                Không có thể loại nào. Vui lòng tạo thể loại trước.
                            </span>
                        )}
                    </div>

                    <div className="form-group checkbox-group">
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="task-completed"
                                checked={completed}
                                onChange={e => setCompleted(e.target.checked)}
                            />
                            <label htmlFor="task-completed" className="inline-label">
                                Đã hoàn thành
                            </label>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="cancel-button"
                            disabled={isSaving}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Đang lưu...' : 'Cập nhật'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;