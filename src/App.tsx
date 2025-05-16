import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import TaskManagementPage from './pages/TaskManagementPage'; // Import TaskManagementPage
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';
import './styles/App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <div className="sidebar">
            <Dashboard />
          </div>
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/TaskManagement" element={<TaskManagementPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />
              <Route path="/AddTask" element={<AddTask />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/EditTask/:id" element={<EditTask />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;