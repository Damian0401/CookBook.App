namespace API.Models.Dtos;

public class GetRecipeByIdDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime LastEdit { get; set; }
    public string Category { get; set; } = null!;
    public List<string> Ingredients { get; set; } = null!;
}
