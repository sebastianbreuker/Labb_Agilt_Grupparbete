import { useEffect, useMemo, useState } from "react";
import "./App.css";
import * as todoApi from "./api/todoApi";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.isCompleted).length,
    [todos],
  );

  const loadTodos = async () => {
    try {
      setError("");
      setIsLoading(true);
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    try {
      setError("");
      const created = await todoApi.createTodo(trimmed);
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  };

  const handleComplete = async (id) => {
    try {
      setError("");
      await todoApi.completeTodo(id);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: true } : todo,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1>Todo-lista</h1>
        </div>
        <div className="stats">
          <div>
            <span className="stat-label">Totalt</span>
            <span className="stat-value">{todos.length}</span>
          </div>
          <div>
            <span className="stat-label">Kvar</span>
            <span className="stat-value">{remainingCount}</span>
          </div>
        </div>
      </header>

      <section className="card">
        <TodoForm title={title} onTitleChange={setTitle} onSubmit={handleCreate} />

        {error ? <p className="error">{error}</p> : null}

        <TodoList
          todos={todos}
          isLoading={isLoading}
          onRefresh={loadTodos}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}

export default App;
