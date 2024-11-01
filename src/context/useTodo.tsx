"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export type todoType = {
    id: number
    message: string
    completed: boolean
}

type contextType = {
    todos: todoType[];
    setTodos: Dispatch<SetStateAction<todoType[]>>
    addTodo: (todo: todoType) => void
    updateTodo: (id: number, todo: todoType) => void
    deleteTodo: (id: number) => void
    toggleComplete: (id: number) => void
}

const defaultContextValue: contextType = {
    todos: [],
    setTodos: () => { },
    addTodo: () => { },
    updateTodo: () => { },
    deleteTodo: () => { },
    toggleComplete: () => { }
}

const TodoContext = createContext<contextType>(defaultContextValue)

const TodoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<todoType[]>([])

    const addTodo = (todo: todoType) => {
        setTodos((prevTodos) => [todo, ...prevTodos])
    }

    const updateTodo = (id: number, todo: todoType) => {
        setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => (prevTodo.id !== id)))
    }

    const toggleComplete = (id: number) => {
        setTodos((prevTodos) => prevTodos.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    }

    return <TodoContext.Provider value={{ todos, setTodos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        {children}
    </TodoContext.Provider>

}

export default TodoContextProvider

export const useTodo = () => {
    const context = useContext(TodoContext)
    if (!context)
        throw new Error("Element not wrapped in UserContextProvider")
    return context
}