using API.Interfaces;
using API.Models;
using API.Models.Dtos;
using API.Models.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class RecipeService : IRecipeService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public RecipeService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> CreateAsync(CreateRecipeDto dto)
    {
        var recipe = _mapper.Map<Recipe>(dto);

        recipe.LastEdit = DateTime.Now;

        var category = await _context.Categories
            .FirstOrDefaultAsync(x => x.Name.Equals(dto.Category));

        recipe.Category = category is not null
            ? category : new Category{Name = dto.Category};

        _context.Recipes.Add(recipe);

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<bool> DeteleAsync(Guid id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe is null) return false;

        var recipeCount = await _context.Recipes
            .Where(x => x.CategoryId.Equals(recipe.CategoryId))
            .CountAsync();

        _context.Recipes.Remove(recipe);

        if (recipeCount == 1)
        {
            var category = await _context.Categories
                .FindAsync(recipe.CategoryId);

            _context.Categories.Remove(category!);
        }

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<List<GetRecipeDto>> GetAllAsync()
    {
        var dto = await _context.Recipes
            .ProjectTo<GetRecipeDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return dto;
    }

    public async Task<GetRecipeByIdDto> GetByIdAsync(Guid id)
    {
        var dto = await _context.Recipes
            .ProjectTo<GetRecipeByIdDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));

        return dto!;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateRecipeDto dto)
    {
        var recipe = await _context.Recipes
            .Include(x => x.Ingredients)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));

        if (recipe is null) return false;

        var ingredientsToRemove = recipe.Ingredients
            .Where(x => !dto.Ingredients.Contains(x.Name))
            .ToList();

        var ingredientsToAdd = dto.Ingredients
            .Where(x => !recipe.Ingredients.Select(i => i.Name).Contains(x))
            .Select(x => new Ingredient{Name = x})
            .ToList();

        var category = await _context.Categories
            .FirstOrDefaultAsync(x => x.Id.Equals(recipe.CategoryId));

        if (category!.Name != dto.Category)
        {
            var newCategory = new Category{Name = dto.Category};
            _context.Categories.Add(newCategory);
            recipe.CategoryId = newCategory.Id;
            _context.Categories.Remove(category);
        }

        foreach (var ingredient in ingredientsToRemove)
        {
            recipe.Ingredients.Remove(ingredient);
        }

        foreach (var ingredient in ingredientsToAdd)
        {
            recipe.Ingredients.Add(ingredient);
        }

        _mapper.Map(dto, recipe);

        recipe.LastEdit = DateTime.Now;

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }
}
