import React from 'react';
import Dashboard from './components/IPODashboard';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; // Make sure the import path is correct
import StockDashboard from './components/StockDashboard';


function DashboardPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
            {/* Dashboard content goes here */}
            <StockDashboard />
            <Dashboard />
        </div>
    );
}

export default DashboardPage;