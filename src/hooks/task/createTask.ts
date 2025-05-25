import { authHeader } from "../../service/auth-header";
import CreateTaskInput from "../../types/CreateTaskInput";


const createTaskApi = async (task: CreateTaskInput): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_API_URL}/v1/tasks/create_tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } as HeadersInit,
        body: JSON.stringify(task)
    });
};

export default createTaskApi;

