function TodoItem({ todo, onComplete, onDelete }) {
  return (
    <li className={todo.isCompleted ? "done" : ""}>
      <div>
        <p className="todo-title">{todo.title}</p>
        <span className="todo-meta">
          {todo.isCompleted ? "Klar" : "Inte klar"}
        </span>
      </div>
      <div className="actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => onComplete(todo.id)}
          disabled={todo.isCompleted}
        >
          Klar
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => onDelete(todo.id)}
        >
          Ta bort
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
