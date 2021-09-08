import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const {id, taks, completed} = todo

    const handleTodoClick = () => {
        toggleTodo(id)
    }

    return (
        <li><input type="checkbox" checked={completed} onChange={handleTodoClick} />{taks}</li>
    )
}