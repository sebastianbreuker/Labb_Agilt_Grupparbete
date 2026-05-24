function TodoForm({ title, onTitleChange, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="input-group">
        <label htmlFor="todo-title">Ny todo</label>
        <input
          id="todo-title"
          name="todo-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Skriv en todo..."
          maxLength={120}
        />
      </div>
      <button type="submit" className="primary-button">
        Lägg till
      </button>
    </form>
  );
}

export default TodoForm;
