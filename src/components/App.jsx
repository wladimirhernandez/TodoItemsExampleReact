import React, {Fragment, useState, useRef, useEffect} from 'react'
import { TodoList } from './TodoList'

const KEY = 'todoApp.todos'

export function App (){
    const [todos, setTodos] = useState([
        {id: 1, taks: 'Tarea 1', completed: false}    
    ])

    const todoTaksRef = useRef()

    const toggleTodo = (id) => {
        const newTodos = [...todos]

        const todo = newTodos.find((todo) => todo.id === id)

        todo.completed = !todo.completed

        setTodos(newTodos)
    }

    useEffect(() => {
      const storedTodos =  JSON.parse(localStorage.getItem(KEY));
        if(storedTodos.length > 0) {
          setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const handleTodoAdd = () => {
        const taks = todoTaksRef.current.value;
        if(taks === '') return

        setTodos((prevTodos) => {
            return [...prevTodos, {id: todos.length + 1, taks, completed: false}]
        })

        todoTaksRef.current.value = null
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed)

        setTodos(newTodos)
    }

    return (<Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoTaksRef} type="text" placeholder="Nueva Tarea" />
        <button onClick={handleTodoAdd}>+</button>
        <button onClick={handleClearAll}>Delete</button>
        <h4>
            Te quedan {todos.filter((e) => !e.completed).length} por terminar
        </h4>
        </Fragment>
    )
}