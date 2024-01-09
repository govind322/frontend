import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        };

        // Add a check to ensure password and confirmPassword match
        // This is frontend validation and should also be verified in the backend
        if (data.password !== data.confirmPassword) {
            console.error('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                navigate('/');
                // Redirect user or perform other actions after successful registration
            } else {
                alert('Registration Failed')
                console.error('Registration failed');
                // Handle registration failure
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle errors
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;