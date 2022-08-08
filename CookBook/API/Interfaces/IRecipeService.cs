using API.Models.Dtos;

namespace API.Interfaces;

public interface IRecipeService
{
    Task<bool> CreateAsync(CreateRecipeDto dto);
    Task<bool> UpdateAsync(Guid id, UpdateRecipeDto dto);
    Task<bool> DeteleAsync(Guid id);
    Task<GetRecipeByIdDto> GetByIdAsync(Guid id);
    Task<List<GetRecipeDto>> GetAllAsync();
}
