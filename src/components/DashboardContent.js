import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function DashboardContent() {
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const navigate = useNavigate(); // Hook para redireccionar

    // Filtros
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [statusFilter, searchTerm, fromDate, toDate]);

    const fetchUser = () => {
        const token = localStorage.getItem('token');

        fetch('https://taskmanager-backend-22up.onrender.com/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUserName(data.name));
    };

    const fetchTasks = () => {
        const token = localStorage.getItem('token');

        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (searchTerm) params.append('search', searchTerm);
        if (fromDate) params.append('fromDate', fromDate);
        if (toDate) params.append('toDate', toDate);

        fetch(`https://taskmanager-backend-22up.onrender.com/api/tasks?${params.toString()}`, {
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

        const res = await fetch(`https://taskmanager-backend-22up.onrender.com/api/tasks/${taskId}`, {
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <div className="dashboard-header">
                <h1>Bienvenid@, {userName}</h1>
                <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </div>

            <div className="filter-container">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                </select>

                <input
                    type="text"
                    placeholder="Buscar palabra clave"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <button
                onClick={() => {
                    setTaskToEdit(null);
                    setShowForm(!showForm);
                }}
                className="new-task-button"
            >
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
