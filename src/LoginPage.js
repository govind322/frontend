import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                login(); // Set the isAuthenticated state to true
                navigate('/dashboard');
                // Redirect user or perform other actions after successful login
            } else {
                console.error('Login failed');
                alert('Invalid Email or Password')
                // Handle login failure
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle errors
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;