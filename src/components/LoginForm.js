import React, { useState } from 'react';
import '../styles/LoginForm.css';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí irá la lógica de login con el backend
        console.log('Login:', { email, password });
    };

    return (
        <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <label>Contraseña:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button type="submit">Ingresar</button>
        </form>
        <Link to="/register" className="register-button">Registrarse</Link>

        </div>
    );
}

export default LoginForm;
