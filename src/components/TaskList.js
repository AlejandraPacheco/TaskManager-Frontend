import React from 'react';
import '../styles/TaskList.css';
import dayjs from 'dayjs';

function TaskList({ tasks, onDeleteTask, onEditTask }) {
    const handleDelete = (task) => {
        if (task.status !== 'Completada') {
            alert('Solo puedes eliminar tareas que estén completadas.');
            return;
        }

        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea completada?');
        if (confirmDelete) {
            onDeleteTask(task.id);
        }
    };

    return (
        <div className="task-list-container">
            <h2 className="task-list-title">Mis Tareas</h2>
            {tasks.length === 0 ? (
                <p>No hay tareas para mostrar.</p>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-card">
                            <h3>{task.title}</h3>
                            <p><strong>Descripción:</strong> {task.description}</p>
                            <p><strong>Estado:</strong> {task.status}</p>
                            <p><strong>Fecha límite:</strong> {dayjs(task.dueDate).format('DD/MM/YYYY')}</p>

                            <div className="task-actions">
                                <button
                                    onClick={() => onEditTask(task)}
                                    disabled={task.status === 'Completada'}
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(task)}
                                    className="delete-btn"
                                    disabled={task.status !== 'Completada'}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
