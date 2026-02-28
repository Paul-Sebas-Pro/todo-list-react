import { useEffect, useState } from "react";

interface IPriority {
  level: "Urgente" | "Moyenne" | "Basse";
}

interface ITodo {
  id: number;
  text: string;
  priority: IPriority;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<IPriority>({ level: "Moyenne" });

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<ITodo[]>([initialTodos]);

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
      priority: { level: "Moyenne" },
    };

    const newTodos = [newTodo, ...todos];

    setTodos(newTodos);
    setInput("");
    setPriority({ level: "Moyenne" });

    console.log(newTodos);
  }

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
        </div>
      </div>
    </>
  );
}

export default App;
