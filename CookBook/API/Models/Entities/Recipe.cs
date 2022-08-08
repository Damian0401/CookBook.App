namespace API.Models.Entities;

public class Recipe
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime LastEdit { get; set; }
    public Guid CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
    public virtual ICollection<Ingredient> Ingredients { get; set; } = null!;
}
