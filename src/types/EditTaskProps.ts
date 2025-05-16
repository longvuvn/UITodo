interface EditTaskProps {
    task: {
        id: string;
        title: string;
        note: string;
        completed: boolean;
        deadline: string;
        status: string;
        category: { id: string };
    };
    onUpdate: (updatedTask: any) => void;
}

export default EditTaskProps;