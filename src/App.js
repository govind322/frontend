import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import LoginPage from './LoginPage';
import { AuthProvider } from './AuthContext';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider> {/* Make sure AuthProvider is at the root */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function HomePage() {
  return (
    <div className="App-header">
      <h1>Welcome to the Stock Market Dashboard</h1>
      <p>Please login or register to continue.</p>
      <nav>
        <Link className="App-link" to="/login">Login</Link>
        <Link className="App-link" to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;