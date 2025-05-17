import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    function handleLoginSuccess() {
        alert('Login exitoso, redirigir a Dashboard...');
        // Aquí puedes usar React Router para redirigir o manejar estado global
    }

    return React.createElement(
        'div',
        { className: 'login-page' },
        React.createElement('h1', null, 'Gestor de Tareas'),
        React.createElement(LoginForm, { onLoginSuccess: handleLoginSuccess })
    );
}

export default LoginPage;
