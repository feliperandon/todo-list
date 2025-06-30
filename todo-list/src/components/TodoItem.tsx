import { FaTrash } from "react-icons/fa";

import type { TodosType } from "../types/todosType";

type Props = {
  task: TodosType;
  toggleCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = ({ task, toggleCompleted, deleteTodo }: Props) => {
  return (
    <>
      <li key={task.id} className="flex gap-2.5 py-1 ">
        <input
          type="checkbox"
          onChange={() => toggleCompleted(task.id)}
          checked={task.completed}
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
        <button
          type="button"
          onClick={() => deleteTodo(task.id)}
          className="cursor-pointer"
        >
          <FaTrash className="hover:fill-red-500" />
        </button>
      </li>
    </>
  );
};

export default TodoItem;
