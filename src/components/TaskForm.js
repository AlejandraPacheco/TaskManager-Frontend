import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pendiente');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, dueDate, status }),
        });

        if (response.ok) {
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('Pendiente');
            onTaskCreated(); // Notifica al Dashboard para recargar lista
        } else {
            alert('Error al crear tarea');
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>Nueva Tarea</h3>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pendiente">Pendiente</option>
            </select>
            <button type="submit">Crear Tarea</button>
        </form>
    );
}

export default TaskForm;
