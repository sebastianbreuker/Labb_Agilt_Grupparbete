const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5017/api";

export async function fetchTodos() {
  const response = await fetch(`${API_BASE}/todo`);
  if (!response.ok) throw new Error("Kunde inte hämta todos.");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function createTodo(title) {
  const response = await fetch(`${API_BASE}/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Kunde inte skapa todo.");
  }
  return response.json();
}

export async function completeTodo(id) {
  const response = await fetch(`${API_BASE}/todo/${id}/complete`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Kunde inte markera som klar.");
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE}/todo/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Kunde inte ta bort todo.");
}
