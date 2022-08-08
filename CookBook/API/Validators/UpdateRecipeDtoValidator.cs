using API.Models.Dtos;
using FluentValidation;

namespace API.Validators;
public class UpdateRecipeDtoValidator : AbstractValidator<UpdateRecipeDto>
{
    public UpdateRecipeDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(256)
            .MinimumLength(5);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(512);

        RuleFor(x => x.Category)
            .NotEmpty()
            .MaximumLength(64)
            .MinimumLength(4);

        RuleFor(x => x.Ingredients)
            .Must(i => i.Distinct().Count() == i.Count())
            .WithMessage("All ingredients have to be unique");
    }
}