import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onTaskCreated, onTaskUpdated, taskToEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pendiente');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.slice(0, 10) : '');
            setStatus(taskToEdit.status);
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (taskToEdit) {
            const prevStatus = taskToEdit.status;

            if (prevStatus === 'Completada') {
                alert('No se puede modificar una tarea completada.');
                return;
            }

            // Restricción de estados
            if (prevStatus === 'Pendiente' && status === 'Pendiente') {
            } else if (prevStatus === 'Pendiente' && status === 'En progreso') {
            } else if (prevStatus === 'En progreso' && status === 'Completada') {
            } else if (status === 'Pendiente') {
                alert('No se puede volver al estado "Pendiente".');
                return;
            } else if (status === 'Completada' && prevStatus !== 'En progreso') {
                alert('Solo se puede marcar como "Completada" si está en "En progreso".');
                return;
            }
        }

        const token = localStorage.getItem('token');
        const url = taskToEdit
            ? `http://localhost:5000/api/tasks/${taskToEdit.id}`
            : 'http://localhost:5000/api/tasks';
        const method = taskToEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
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
            taskToEdit ? onTaskUpdated() : onTaskCreated();
        } else {
            alert(taskToEdit ? 'Error al actualizar tarea' : 'Error al crear tarea');
        }
    };

    const isCompleted = taskToEdit && taskToEdit.status === 'Completada';

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>{taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h3>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isCompleted}
                required
            />

            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isCompleted}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isCompleted}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isCompleted}
            >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
            </select>

            <button type="submit" disabled={isCompleted}>
                {taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
        </form>
    );
}

export default TaskForm;
