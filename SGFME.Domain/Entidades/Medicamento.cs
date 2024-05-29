using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGFME.Domain.Entidades
{
    //Nome, principio ativo, lote, validade, fabricante, forma farmaceutica,
    //dosagens existentes.
    public class Medicamento : BaseEntity
    {
        public string nome { get; set; }
        public string principioAtivo { get; set; }
        public string lote { get; set; }
        public DateTime dataValidade { get; set; }
        public string fabricante { get; set; }
        public string formaFarmaceutica { get; set; }
        public string dosagemExistente { get; set; }
    }
}
