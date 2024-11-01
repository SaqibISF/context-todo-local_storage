"use client"
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useTodo } from "@/context/useTodo";
import { useEffect } from "react";

export default function Home() {
  const { todos, setTodos } = useTodo()

  useEffect(() => {
    const value = localStorage.getItem("todos")
    if (value) {
      const todos = JSON.parse(value)
      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    }
  }, [setTodos])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-col gap-y-3">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      </div>
    </div>
  );
}
