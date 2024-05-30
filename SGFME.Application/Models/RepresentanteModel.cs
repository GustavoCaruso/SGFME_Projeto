﻿using SGFME.Domain.Entidades;

namespace SGFME.Application.Models
{
    public class RepresentanteModel
    {
        public long id { get; set; }
        public string nomeCompleto { get; set; }
        public DateTime dataNascimento { get; set; }
        public DateTime dataCadastro { get; set; }
        public string rgNumero { get; set; }
        public DateTime rgDataEmissao { get; set; }
        public string rgOrgaoExpedidor { get; set; }
        public string rgUfEmissao { get; set; }
        public string cnsNumero { get; set; }
        public string cpfNumero { get; set; }

        public virtual ICollection<Contato> contato { get; set; } = new List<Contato>();
    }
}
