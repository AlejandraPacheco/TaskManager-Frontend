import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function DashboardContent() {
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUserAndTasks();
    }, []);

    const fetchUserAndTasks = () => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setUserName(data.name));

        fetchTasks();
    };

    const fetchTasks = () => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    };

    const handleTaskCreated = () => {
        setShowForm(false);
        fetchTasks(); // recarga las tareas tras crear
    };

    return (
        <>
            <h1>Bienvenido, {userName}</h1>

            <button onClick={() => setShowForm(!showForm)} className="new-task-button">
                {showForm ? 'Cancelar' : 'Nueva Tarea'}
            </button>

            {showForm && <TaskForm onTaskCreated={handleTaskCreated} />}

            <TaskList tasks={tasks} />
        </>
    );
}

export default DashboardContent;
