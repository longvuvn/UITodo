import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS riêng

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Todo App 📝</h1>
            <p className="home-subtitle">Manage your tasks efficiently and stay organized!</p>

            <div className="features-section">
                <h2 className="features-title">Features</h2>
                <ul className="features-list">
                    <li>
                        <Link to="/tasks" className="feature-link">Task Management</Link> - Create, update, and manage your tasks.
                    </li>
                    <li>
                        <Link to="/categories" className="feature-link">Category Management</Link> - Organize tasks by categories.
                    </li>
                    <li>
                        <Link to="/users" className="feature-link">User Management</Link> - Assign tasks to users.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
