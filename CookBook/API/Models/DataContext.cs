using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public virtual DbSet<Recipe> Recipes { get; set; } = null!;
    public virtual DbSet<Ingredient> Ingredients { get; set; } = null!;
    public virtual DbSet<Category> Categories { get; set; } = null!;
}
