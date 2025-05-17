import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';

function DashboardContent() {
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Obtener nombre de usuario autenticado
        fetch('http://localhost:5000/api/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setUserName(data.name));

        // Obtener tareas
        fetch('http://localhost:5000/api/tasks', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }, []);

    return (
        <>
        <h1>Bienvenido, {userName}</h1>
        <TaskList tasks={tasks} />
        </>
    );
}

export default DashboardContent;
