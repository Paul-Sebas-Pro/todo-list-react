import type { ITodo } from "./App";

type TodoProps = {
  todo: ITodo;
};

const priorityColor = {
  Urgente: "badge-error",
  Moyenne: "badge-warning",
  Basse: "badge-success",
};

const TodoItem = ({ todo }: TodoProps) => {
  return (
    <li className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
          />

          <span className="text-md font-bold">
            <span>{todo.text}</span>
          </span>

          <span
            className={`badge badge-sm badge-soft ${priorityColor[todo.priority]}`}
          >
            {todo.priority}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
