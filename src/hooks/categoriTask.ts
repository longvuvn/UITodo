import { authHeader } from "../service/auth-header";
import Category from "../types/Category";

const categoriesTask = async (): Promise<Category[]> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/categories`, {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        } as HeadersInit
    });
    if (!response.ok) return [];
    return response.json();
};

export default categoriesTask;