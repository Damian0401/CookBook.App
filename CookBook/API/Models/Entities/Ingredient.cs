namespace API.Models.Entities;

public class Ingredient
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public Guid RecipeId { get; set; }
    public virtual Recipe Recipe { get; set; } = null!;
}
