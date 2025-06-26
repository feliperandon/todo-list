import type { TodosType } from "./types/todosType";

import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState<TodosType[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = (title: string) => {
    const newTodo: TodosType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodo((prev) => [...prev, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    addTodo(title);
    setTitle("");
  };

  const toggleCompleted = (id: string) => {
    const comTodos = todo.map((todos) => {
      if (todos.id === id) {
        return {
          ...todos,
          completed: !todos.completed,
        };
      }
      return todos;
    });
    console.log(comTodos);
    return setTodo(comTodos);
  };

  const deleteTodo = (id: string) => {
    setTodo(todo.filter((todos) => todos.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="mt-4">
        {todo.map((task) => (
          <div className="flex gap-2.5 items-center">
            <li key={task.id} className="py-1">
              <span
                className={task.completed ? "line-through text-gray-400" : ""}
              >
                {task.title}
              </span>
            </li>
            <input
              type="checkbox"
              onChange={() => toggleCompleted(task.id)}
              checked={task.completed}
            />
            <button
              type="button"
              onClick={() => deleteTodo(task.id)}
              className="cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
