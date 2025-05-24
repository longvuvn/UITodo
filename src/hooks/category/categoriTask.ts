import { authHeader } from '../../service/auth-header';
import Category from '../../types/Category';

const categoriesTask = async (): Promise<Category[]> => {
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
        console.log("Phản hồi từ API danh mục:", apiResponse);

        // Trích xuất dữ liệu từ cấu trúc ApiResponse
        if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
            return apiResponse.data; // Lấy mảng danh mục từ trường data
        } else {
            console.error("Định dạng dữ liệu danh mục không đúng:", apiResponse);
            return [];
        }
    } catch (error) {
        console.error("Lỗi trong quá trình lấy danh mục:", error);
        return [];
    }
};

export default categoriesTask;