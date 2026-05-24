using Labb_Agilt_Grupparbete.Data.Entities;

namespace Labb_Agilt_Grupparbete.Data.Interfaces
{
    public interface ITodoRepo
    {
        IEnumerable<Todo> GetAll();
        Todo? GetById(int id);
        Todo Add(Todo todo);
        bool MarkAsDone(int id);
        bool Delete(int id);
    }
}
