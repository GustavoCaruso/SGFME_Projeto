using FluentValidation;
using SGFME.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGFME.Service.Validators
{
    public class MedicamentoValidator : AbstractValidator<Medicamento>
    {
        //Nome, principio ativo, lote, validade, fabricante, forma farmaceutica,
        //dosagens existentes.

        public MedicamentoValidator() 
        {
            RuleFor(p => p.nome).NotEmpty().WithMessage("Informe o Nome Completo!");
            RuleFor(p => p.nome).NotNull().WithMessage("Informe o nome completo!");

            RuleFor(p => p.principioAtivo).NotEmpty().WithMessage("Informe o Princípio Ativo!");
            RuleFor(p => p.principioAtivo).NotNull().WithMessage("Informe o Principio Ativo!");

            RuleFor(p => p.lote).NotEmpty().WithMessage("Informe o Lote!");
            RuleFor(p => p.lote).NotNull().WithMessage("Informe o Lote!");

            RuleFor(p => p.dataValidade).NotEmpty().WithMessage("Informe a Data de validade!");
            RuleFor(p => p.dataValidade).NotNull().WithMessage("Informe a data de Validade!");

            RuleFor(p => p.fabricante).NotEmpty().WithMessage("Informe o Fabricante do medicamento!");
            RuleFor(p => p.fabricante).NotNull().WithMessage("Informe o Fabricante do medicamento!");

            RuleFor(p => p.formaFarmaceutica).NotEmpty().WithMessage("Informe a Forma Farmacêutica!");
            RuleFor(p => p.formaFarmaceutica).NotNull().WithMessage("Informe a Forma Farmacêutica!");

            RuleFor(p => p.formaFarmaceutica).NotEmpty().WithMessage("Informe a Dosagem Existente!");
            RuleFor(p => p.formaFarmaceutica).NotNull().WithMessage("Informe a Dosagem Existente!");
        }
    }
}
