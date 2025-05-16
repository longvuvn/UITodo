import { useState, useEffect } from "react";
import Task from "../types/Task";
import { authHeader } from "../service/auth-header"; // Thêm dòng này

const useTask = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/v1/tasks", {
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader()
                    } as HeadersInit
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data: Task[] = await response.json();
                setTasks(data); // Cập nhật state với danh sách task
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Failed to fetch tasks");
            }
        };

        fetchTasks(); // Gọi hàm fetchTasks bên trong useEffect
    }, []); // Chỉ chạy một lần khi component được render

    return { tasks, error };
};

export default useTask;