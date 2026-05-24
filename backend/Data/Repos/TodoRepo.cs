using Labb_Agilt_Grupparbete.Data.Entities;
using Labb_Agilt_Grupparbete.Data.Interfaces;

namespace Labb_Agilt_Grupparbete.Data.Repos
{
    public class TodoRepo : ITodoRepo
    {
        private readonly List<Todo> _todos = new();
        private int _nextId = 1;

        public IEnumerable<Todo> GetAll()
        {
            return _todos;
        }

        public Todo? GetById(int id)
        {
            return _todos.FirstOrDefault(t => t.Id == id);
        }

        public Todo Add(Todo todo)
        {
            todo.Id = _nextId++;
            _todos.Add(todo);
            return todo;
        }

        public bool MarkAsDone(int id)
        {
            var todo = GetById(id);
            if (todo is null) return false;

            todo.IsCompleted = true;
            return true;
        }

        public bool Delete(int id)
        {
            var todo = GetById(id);
            if (todo is null) return false;

            _todos.Remove(todo);
            return true;
        }
    }
}
