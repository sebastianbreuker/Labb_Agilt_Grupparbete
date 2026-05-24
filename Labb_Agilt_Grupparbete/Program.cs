using Labb_Agilt_Grupparbete.Core.Interfaces;
using Labb_Agilt_Grupparbete.Core.Services;
using Labb_Agilt_Grupparbete.Data.Interfaces;
using Labb_Agilt_Grupparbete.Data.Repos;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSingleton<ITodoRepo, TodoRepo>();
builder.Services.AddScoped<ITodoService, TodoService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Cors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Cors");
app.MapControllers();

app.Run();
