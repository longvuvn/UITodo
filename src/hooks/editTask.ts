import categoriesTask from './categoriTask';
import { authHeader } from '../service/auth-header';
import UpdateTaskById from '../types/updatedTask';


export const fetchTaskById = async (
    id: string,
    setTask: any,
    setTitle: any,
    setNote: any,
    setCompleted: any,
    setDeadline: any,
    setStatus: any,
    setCategoryId: any
) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/tasks/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } as HeadersInit
    });
    const data = await res.json();
    setTask(data);
    setTitle(data.title);
    setNote(data.note);
    setCompleted(data.completed);
    setDeadline(data.deadline ? data.deadline.slice(0, 16) : '');
    setStatus(data.status);
    setCategoryId(data.category?.id || '');
};

export const fetchAllCategories = async (setCategories: any) => {
    try {
        const data = await categoriesTask();
        setCategories(data);
    } catch {
        setCategories([]);
    }
};


export const updateTaskById = async (
    id: string,
    updatedTask: UpdateTaskById
): Promise<Response> => {
    // Chuyển đổi updatedTask về đúng dạng backend cần
    const body = {
        title: updatedTask.title,
        note: updatedTask.note,
        completed: updatedTask.completed,
        deadline: updatedTask.deadline,
        status: updatedTask.status,
        category: { id: updatedTask.categoryId }
    };

    return fetch(`${import.meta.env.VITE_API_URL}/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } as HeadersInit,
        body: JSON.stringify(body)
    });
};

