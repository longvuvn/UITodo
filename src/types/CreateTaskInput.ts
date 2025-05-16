interface CreateTaskInput {
    title: string;
    note: string;
    completed: boolean;
    deadline: string | null;
    status: string;
    categoryId: string;
}

export default CreateTaskInput;