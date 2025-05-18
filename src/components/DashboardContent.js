import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function DashboardContent() {
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

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
        fetchTasks();
    };

    const handleTaskUpdated = () => {
        setTaskToEdit(null);
        setShowForm(false);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            fetchTasks();
        } else {
            alert('Error al eliminar la tarea');
        }
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setShowForm(true);
    };

    return (
        <>
            <h1>Bienvenido, {userName}</h1>

            <button onClick={() => {
                setTaskToEdit(null);
                setShowForm(!showForm);
            }} className="new-task-button">
                {showForm ? 'Cancelar' : 'Nueva Tarea'}
            </button>

            {showForm && (
                <TaskForm
                    onTaskCreated={handleTaskCreated}
                    onTaskUpdated={handleTaskUpdated}
                    taskToEdit={taskToEdit}
                />
            )}

            <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
            />
        </>
    );
}

export default DashboardContent;
