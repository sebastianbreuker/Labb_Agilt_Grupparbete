using Labb_Agilt_Grupparbete.Core.Interfaces;
using Labb_Agilt_Grupparbete.Data.Entities;
using Labb_Agilt_Grupparbete.Data.Interfaces;

namespace Labb_Agilt_Grupparbete.Core.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepo _todoRepo;

        public TodoService(ITodoRepo todoRepo)
        {
            _todoRepo = todoRepo;
        }

        public IEnumerable<Todo> GetAllTodos()
        {
            return _todoRepo.GetAll();
        }

        public Todo? GetTodoById(int id)
        {
            return _todoRepo.GetById(id);
        }

        public Todo CreateTodo(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Titeln får inte vara tom.", nameof(title));

            var todo = new Todo { Title = title.Trim() };
            return _todoRepo.Add(todo);
        }

        public bool CompleteTodo(int id)
        {
            return _todoRepo.MarkAsDone(id);
        }

        public bool DeleteTodo(int id)
        {
            return _todoRepo.Delete(id);
        }
    }
}
