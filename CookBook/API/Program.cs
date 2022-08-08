using System.Globalization;
using API.Interfaces;
using API.Models;
using API.Models.Dtos;
using API.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var cultureInfo = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddFluentValidation(x => 
    x.RegisterValidatorsFromAssemblyContaining<Program>());
builder.Services.AddDbContext<DataContext>(x => 
    x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("DefaultCors", 
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddTransient<IRecipeService, RecipeService>();
var app = builder.Build();

app.MapGet("/recipe", async (IRecipeService service) => 
{
    var result = await service.GetAllAsync();

    return Results.Ok(result);
});

app.MapGet("/recipe/{id:guid}", async (IRecipeService service, Guid id) => 
{
    var result = await service.GetByIdAsync(id);

    return result is not null ? Results.Ok(result) : Results.NotFound();
});

app.MapPost("/recipe", 
async (IRecipeService service, IValidator<CreateRecipeDto> validator, CreateRecipeDto dto) => 
{
    var validationResult = await validator.ValidateAsync(dto);

    if (!validationResult.IsValid)
    {
        var errors = validationResult.Errors
            .Select(x => x.ErrorMessage);

        return Results.BadRequest(new {Errors = errors});
    }

    var result = await service.CreateAsync(dto);
    
    return result ? Results.NoContent() : Results.BadRequest();
});

app.MapPut("/recipe/{id:guid}", 
async (IRecipeService service, IValidator<UpdateRecipeDto> validator, Guid id, UpdateRecipeDto dto) => 
{
    var validationResult = await validator.ValidateAsync(dto);

    if (!validationResult.IsValid)
    {
        var errors = validationResult.Errors
            .Select(x => x.ErrorMessage);

        return Results.BadRequest(new {Errors = errors});
    }

    var result = await service.UpdateAsync(id, dto);
    
    return result ? Results.NoContent() : Results.BadRequest();
});

app.MapDelete("/recipe/{id:guid}", async (IRecipeService service, Guid id) =>  
{
    var result = await service.DeteleAsync(id);
    
    return result ? Results.NoContent() : Results.NotFound();
});

app.UseSwagger();
app.UseSwaggerUI(config =>
{
    config.SwaggerEndpoint("/swagger/v1/swagger.json", "CookBook Api v1");
    config.RoutePrefix = string.Empty;
});
app.UseCors("DefaultCors");
app.Run();
