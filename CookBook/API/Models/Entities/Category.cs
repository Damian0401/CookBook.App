namespace API.Models.Entities;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual ICollection<Recipe> Recipes { get; set; } = null!;
}