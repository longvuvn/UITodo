import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <nav className="dashboard-nav">
                <Link to="/" className="dashboard-link">
                    Home
                </Link>
                <Link to="/TaskManagement" className="dashboard-link">
                    Tasks
                </Link>
            </nav>
        </div>
    );
};

export default Dashboard;