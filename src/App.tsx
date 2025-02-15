import React, { useState, useEffect, useCallback, memo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./component/Button";
import TextField from "./component/TextField";
import TodoItem from "./component/TodoItem";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get<Todo[]>(API_URL)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = useCallback(() => {
    if (newTodo.trim() === "") return;
    const newTask: Todo = { id: Date.now(), title: newTodo, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo("");
  }, [newTodo]);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, [setTodos]);

  const toggleComplete = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, [setTodos]);

  const editTodo = useCallback((id: number, title: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  }, [setTodos]);

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-3">ToDo List</h2>
      <div className="input-group mb-3">
        <TextField value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add new todo" />
        <Button className="btn-primary" onClick={addTodo}>Add</Button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggleComplete={toggleComplete} onEdit={editTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
