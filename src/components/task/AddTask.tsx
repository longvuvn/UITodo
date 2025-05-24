import React, { useState, useEffect } from 'react';
import '../../styles/task/AddTask.css';
import Category from '../../types/Category';
import { useNavigate } from 'react-router-dom';
import createTaskApi from '../../hooks/task/createTask';
import categoriesTask from '../../hooks/category/categoriTask';

const AddTask: React.FC = () => {
    // States for task data
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [completed, setCompleted] = useState(false);
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('MEDIUM');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    // States for UI
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    useEffect(() => {
        const loadCategories = async () => {
            setIsLoading(true);
            try {
                console.log("Đang tải danh mục...");
                const data = await categoriesTask();
                console.log("Danh mục đã tải:", data);
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
                setMessage("Không thể tải danh mục. Một số chức năng có thể bị hạn chế.");
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, []);

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
        } else {
            const deadlineDate = new Date(deadline);
            if (isNaN(deadlineDate.getTime())) {
                errors.deadline = "Ngày không hợp lệ";
            }
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
            setMessage("Vui lòng điền đầy đủ thông tin hợp lệ.");
            return;
        }

        setIsSubmitting(true);
        setMessage('');
        setIsError(false);

        const newTask = {
            title: title.trim(),
            note: note.trim(),
            completed,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            status,
            categoryId
        };

        try {
            const response = await createTaskApi(newTask);
            if (response.ok) {
                setMessage('Thêm công việc thành công!');
                setIsError(false);

                // Reset form sau khi thêm thành công
                setTimeout(() => {
                    navigate('/TaskManagement');
                }, 1500);
            } else {
                const errorData = await response.json().catch(() => null);
                setIsError(true);
                setMessage(errorData?.message || 'Không thể thêm công việc!');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Lỗi hệ thống! Vui lòng thử lại sau.');
            console.error('Error adding task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/TaskManagement');
    };

    return (
        <div className="add-task-container">
            <div className="add-task-form">
                <h2>Thêm công việc mới</h2>

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
                            placeholder="Nhập tiêu đề công việc"
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
                            placeholder="Mô tả chi tiết công việc"
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
                            className="priority-select"
                        >
                            <option value="LOW" className="priority-option priority-low">Thấp</option>
                            <option value="MEDIUM" className="priority-option priority-medium">Trung bình</option>
                            <option value="HIGH" className="priority-option priority-high">Cao</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-category">Thể loại: <span className="required">*</span></label>
                        {isLoading ? (
                            <div className="loading-inline">Đang tải danh mục...</div>
                        ) : (
                            <>
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
                            </>
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
                            disabled={isSubmitting}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang thêm...' : 'Thêm công việc'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;