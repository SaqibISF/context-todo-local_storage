import { todoType, useTodo } from "@/context/useTodo";
import { useId, useState } from "react";

const TodoItem: React.FC<{ todo: todoType }> = ({ todo }) => {

    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [message, setMessage] = useState(todo.message)

    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            if (isTodoEditable)
                updateTodo(todo.id, { ...todo, message })
            setIsTodoEditable((prev) => !prev);
        }}
            className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black
         ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
            <input id={useId()}
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)} />
            <input id={useId()}
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg 
                    ${isTodoEditable ? "border-black/10 px-2" : "border-transparent cursor-default"}
                    ${todo.completed ? "line-through" : ""}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                readOnly={!isTodoEditable} />
            {/* Edit, Save Button */}
            <button type="submit"
                disabled={todo.completed}
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50">
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button type="button"
                onClick={() => deleteTodo(todo.id)}
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0">
                ❌
            </button>
        </form>
    );
}

export default TodoItem;