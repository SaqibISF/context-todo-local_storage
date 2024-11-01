import { useTodo } from "@/context/useTodo";
import { FormEvent, useState } from "react";

const TodoForm: React.FC = () => {

    const [message, setMessage] = useState<string>("")

    const { addTodo } = useTodo()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) return

        addTodo({
            id: Date.now(),
            message,
            completed: false
        })

        setMessage("")
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5" />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
