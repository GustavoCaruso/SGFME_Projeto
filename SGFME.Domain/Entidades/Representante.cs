﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGFME.Domain.Entidades
{
    public class Representante : BaseEntity
    {
        public string nomeCompleto { get; set; }  
        public DateTime dataNascimento { get; set; }
        public DateTime dataCadastro { get; set; }
        public string rgNumero { get; set; }
        public DateTime rgDataEmissao { get; set; }
        public string rgOrgaoExpedidor { get; set; }
        public string rgUfEmissao { get; set; }
        public string cnsNumero { get; set; }
        public string cpfNumero { get; set; }
        public long idStatus { get; set; } 
        public virtual Status status { get; set; } 
        public virtual ICollection<Contato> contato { get; set; } = new List<Contato>();
        public virtual ICollection<Endereco> endereco { get; set; } = new List<Endereco>();

    }
}
