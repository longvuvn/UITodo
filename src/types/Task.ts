import Category from "./Category";

interface Task {
    id: string;
    title: string;
    note: string;
    completed: boolean;
    deadline: string;
    category?: Category;
    status: string;
}

export default Task;