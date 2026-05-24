import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5017/api";

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
      const response = await fetch(`${API_BASE}/todo`);

      if (!response.ok) {
        throw new Error("Kunde inte hamta todos.");
      }

      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nagot gick fel.");
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
      const response = await fetch(`${API_BASE}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: trimmed }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Kunde inte skapa todo.");
      }

      const created = await response.json();
      setTodos((prev) => [created, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nagot gick fel.");
    }
  };

  const handleComplete = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE}/todo/${id}/complete`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Kunde inte markera som klar.");
      }

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: true } : todo,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nagot gick fel.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      const response = await fetch(`${API_BASE}/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort todo.");
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nagot gick fel.");
    }
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Skolprojekt</p>
          <h1>Din Todo-lista</h1>
          <p className="subtitle">
            Enkel koll pa vad som ar kvar att gora idag.
          </p>
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
        <form className="form" onSubmit={handleCreate}>
          <div className="input-group">
            <label htmlFor="todo-title">Ny todo</label>
            <input
              id="todo-title"
              name="todo-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Skriv en uppgift..."
              maxLength={120}
            />
          </div>
          <button type="submit" className="primary-button">
            Lagg till
          </button>
        </form>

        {error ? <p className="error">{error}</p> : null}

        <div className="list-header">
          <h2>Uppgifter</h2>
          <button type="button" className="ghost-button" onClick={loadTodos}>
            Uppdatera
          </button>
        </div>

        {isLoading ? (
          <p className="muted">Laddar...</p>
        ) : todos.length === 0 ? (
          <p className="muted">
            Inga uppgifter an. Laggt till en for att komma igang.
          </p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.isCompleted ? "done" : ""}>
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
                    onClick={() => handleComplete(todo.id)}
                    disabled={todo.isCompleted}
                  >
                    Klar
                  </button>
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Ta bort
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
