import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

export interface IPriority {
  level: "Urgente" | "Moyenne" | "Basse" | "Tous";
}

export interface ITodo {
  id: number;
  text: string;
  priority: IPriority;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<IPriority>({ level: "Moyenne" });

  const savedTodos = localStorage.getItem("todos");
  const initialTodos: ITodo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  const [filter, setFilter] = useState<IPriority>({ level: "Tous" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") {
      return;
    }

    const newTodo: ITodo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];

    setTodos(newTodos);
    setInput("");
    setPriority({ level: "Moyenne" });
  }

  const filteredTodos: ITodo[] =
    filter.level === "Tous"
      ? todos
      : todos.filter((todo) => todo.priority.level === filter.level);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
          <div className="flex gap-4">
            <input
              type="text"
              className="input w-full"
              placeholder="Ajouter une tâche..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <select
              className="select w-full"
              value={priority.level}
              onChange={(e) => {
                setPriority({
                  level: e.target.value as "Urgente" | "Moyenne" | "Basse",
                });
              }}
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <button onClick={addTodo} className="btn btn-primary">
              Ajouter
            </button>
          </div>
          <div className="space-y flex-1 h-fit">
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${filter.level === "Tous" ? "btn-primary" : ""}`}
                onClick={() => {
                  setFilter({ level: "Tous" });
                }}
              >
                Tous
              </button>
            </div>
            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem todo={todo} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>Aucun tâche trouvée.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
