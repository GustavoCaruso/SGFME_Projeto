﻿using FluentValidation;
using SGFME.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGFME.Service.Validators
{
    public class EspecialidadeValidator : AbstractValidator<Especialidade>
    {
        public EspecialidadeValidator()
        {
            RuleFor(p => p.nome).NotEmpty().WithMessage("Informe o nome!");
            RuleFor(p => p.nome).NotNull().WithMessage("Informe o nome!");
            
        }
    }
}