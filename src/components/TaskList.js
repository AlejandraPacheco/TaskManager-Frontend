import React from 'react';
import '../styles/TaskList.css';

function TaskList({ tasks }) {
    return (
        <div className="task-list-container">
        <h2 className="task-list-title">Mis Tareas</h2>
        {tasks.length === 0 ? (
            <p>No tienes tareas aún.</p>
        ) : (
            <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <p><strong>Fecha límite:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default TaskList;
