import type { ITodo } from "./App";

type TodoProps = {
  todo: ITodo;
};

const TodoItem = ({ todo }: TodoProps) => {
  return <li>{todo.text}</li>;
};

export default TodoItem;
