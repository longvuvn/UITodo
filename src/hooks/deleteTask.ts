import { authHeader } from '../service/auth-header';

const deleteTaskById = async (id: string) => {
    return fetch(`${import.meta.env.VITE_API_URL}/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } as HeadersInit
    });
};

export default deleteTaskById;