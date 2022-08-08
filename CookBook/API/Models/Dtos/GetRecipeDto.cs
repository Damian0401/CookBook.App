namespace API.Models.Dtos;
public class GetRecipeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime LastEdit { get; set; }
    public string Category { get; set; } = null!;
}