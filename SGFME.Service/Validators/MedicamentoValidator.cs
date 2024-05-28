using FluentValidation;
using SGFME.Domain.Entidades;

public class MedicamentoValidator : AbstractValidator<Medicamento>
{
    public MedicamentoValidator()
    {
        RuleFor(p => p.nome)
            .NotEmpty().WithMessage("Informe o Nome Completo!")
            .NotNull().WithMessage("Informe o nome completo!");

        RuleFor(p => p.principioAtivo)
            .NotEmpty().WithMessage("Informe o Princípio Ativo!")
            .NotNull().WithMessage("Informe o Principio Ativo!");

        RuleFor(p => p.lote)
            .NotEmpty().WithMessage("Informe o Lote!")
            .NotNull().WithMessage("Informe o Lote!");

        RuleFor(p => p.dataValidade)
            .NotEmpty().WithMessage("Informe a Data de validade!")
            .NotNull().WithMessage("Informe a data de Validade!")
            .Must(BeAValidDate).WithMessage("Data de validade inválida!")
            .GreaterThan(DateTime.Now).WithMessage("Data de validade não pode ser no passado!");

        RuleFor(p => p.fabricante)
            .NotEmpty().WithMessage("Informe o Fabricante do medicamento!")
            .NotNull().WithMessage("Informe o Fabricante do medicamento!");

        RuleFor(p => p.formaFarmaceutica)
            .NotEmpty().WithMessage("Informe a Forma Farmacêutica!")
            .NotNull().WithMessage("Informe a Forma Farmacêutica!");

        RuleFor(p => p.dosagemExistente)
            .NotEmpty().WithMessage("Informe a Dosagem Existente!")
            .NotNull().WithMessage("Informe a Dosagem Existente!");
    }

    private bool BeAValidDate(DateTime date)
    {
        return !date.Equals(default(DateTime));
    }
}
