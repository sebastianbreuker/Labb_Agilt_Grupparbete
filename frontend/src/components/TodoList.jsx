import TodoItem from "./TodoItem";

function TodoList({ todos, isLoading, onRefresh, onComplete, onDelete }) {
  return (
    <>
      <div className="list-header">
        <h2>Todos:</h2>
        <button type="button" className="ghost-button" onClick={onRefresh}>
          Uppdatera
        </button>
      </div>

      {isLoading ? (
        <p className="muted">Laddar...</p>
      ) : todos.length === 0 ? (
        <p className="muted">Inga todos än. Lägg till en för att komma igång.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
