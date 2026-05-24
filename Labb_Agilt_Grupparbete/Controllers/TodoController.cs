using Labb_Agilt_Grupparbete.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Labb_Agilt_Grupparbete.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        
        [HttpGet]
        public IActionResult GetAll()
        {
            var todos = _todoService.GetAllTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var todo = _todoService.GetTodoById(id);
            if (todo is null) return NotFound();
            return Ok(todo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateTodoRequest request)
        {
            try
            {
                var todo = _todoService.CreateTodo(request.Title);
                return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}/complete")]
        public IActionResult Complete(int id)
        {
            var success = _todoService.CompleteTodo(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _todoService.DeleteTodo(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }

    public record CreateTodoRequest(string Title);
}
