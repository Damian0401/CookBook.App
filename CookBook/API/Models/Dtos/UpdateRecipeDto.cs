namespace API.Models.Dtos;

public class UpdateRecipeDto
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Category { get; set; } = null!;
    public List<string> Ingredients { get; set; } = null!;
}