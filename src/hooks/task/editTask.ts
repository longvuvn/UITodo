import { authHeader } from '../../service/auth-header';
import Category from '../../types/Category';
import UpdateTaskById from '../../types/UpdatedTask';



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

export const fetchAllCategories = async (setCategories: React.Dispatch<React.SetStateAction<Category[]>>) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/categories`, {
            headers: {
                'Content-Type': 'application/json',
                ...authHeader()
            } as HeadersInit
        });

        if (!response.ok) {
            throw new Error(`Không thể lấy danh mục: ${response.status}`);
        }

        const apiResponse = await response.json();
        console.log("Dữ liệu danh mục nhận được:", apiResponse);

        // Kiểm tra cấu trúc phản hồi và trích xuất dữ liệu phù hợp
        if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
            setCategories(apiResponse.data);
        } else {
            console.error('Định dạng dữ liệu danh mục không đúng:', apiResponse);
            setCategories([]);
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        setCategories([]); // Thiết lập mảng rỗng khi có lỗi
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

