using API.Models.Dtos;
using API.Models.Entities;
using AutoMapper;

namespace API.Infrastructure;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<CreateRecipeDto, Recipe>()
            .ForMember(x => x.Category, act => act.Ignore())
            .ForMember(r => r.Ingredients, x =>
                x.MapFrom(s =>
                    new List<Ingredient>(s.Ingredients.Select(i => new Ingredient { Name = i }))));
        CreateMap<UpdateRecipeDto, Recipe>()
            .ForMember(x => x.Ingredients, act => act.Ignore())
            .ForMember(x => x.Category, act => act.Ignore());
        CreateMap<Recipe, GetRecipeDto>()
            .ForMember(r => r.Category, x => x.MapFrom(s => s.Category.Name));
        CreateMap<Recipe, GetRecipeByIdDto>()
            .ForMember(r => r.Category, x => x.MapFrom(s => s.Category.Name))
            .ForMember(r => r.Ingredients, x => 
                x.MapFrom(s => 
                    new List<string>(s.Ingredients.Select(i => i.Name))));
    }
}
