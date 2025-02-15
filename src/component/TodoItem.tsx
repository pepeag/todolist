import React, { useState, memo } from "react";
import CheckBox from "./Checkbox"; 
import Button from "./Button";
import TextField from "./TextField";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = memo(({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.title);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    if (newTodo.trim() !== "") {
      onEdit(todo.id, newTodo);
      setIsEditing(false);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <CheckBox checked={todo.completed} onChange={() => onToggleComplete(todo.id)} className="me-2" />
        {isEditing ? (
          <TextField value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        ) : (
          <span className={todo.completed ? "text-decoration-line-through" : ""}>{todo.title}</span>
        )}
      </div>
      <div>
        {isEditing ? (
          <Button onClick={handleSave} className="btn-success btn-sm me-2">Save</Button>
        ) : (
          <Button onClick={handleEdit} className="btn-secondary btn-sm me-2">Edit</Button>
        )}
        <Button onClick={() => onDelete(todo.id)} className="btn-danger btn-sm">Delete</Button>
      </div>
    </li>
  );
});

export default TodoItem;
