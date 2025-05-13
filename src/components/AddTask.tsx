import React from 'react';
import '../styles/AddTask.css'; // Import CSS vào

const AddTask: React.FC = () => {
    return (

        <div className="add-task-form">
            <h2>Add New Task</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="task-name">Task Name:</label>
                    <input type="text" id="task-name" name="task-name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="task-description">Description:</label>
                    <textarea id="task-description" name="task-description" required></textarea>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;