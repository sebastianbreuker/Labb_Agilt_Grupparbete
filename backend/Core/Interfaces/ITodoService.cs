using Labb_Agilt_Grupparbete.Data.Entities;

namespace Labb_Agilt_Grupparbete.Core.Interfaces
{
    public interface ITodoService
    {
        IEnumerable<Todo> GetAllTodos();
        Todo? GetTodoById(int id);
        Todo CreateTodo(string title);
        bool CompleteTodo(int id);
        bool DeleteTodo(int id);
    }
}
