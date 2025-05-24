import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">📊 Dashboard</h1>
            <nav className="dashboard-nav">
                <Link to="/" className="dashboard-link">
                    🏠 Home
                </Link>
                <Link to="/TaskManagement" className="dashboard-link">
                    ✅ Task Management
                </Link>
            </nav>
        </div>
    );
};

export default Dashboard;
