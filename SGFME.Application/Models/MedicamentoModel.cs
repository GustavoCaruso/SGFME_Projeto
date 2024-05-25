namespace SGFME.Application.Models
{
    public class MedicamentoModel
    {
        public long id { get; set; }
        public string nome { get; set; }
        public string principioAtivo { get; set; }
        public string lote { get; set; }
        public DateTime dataValidade { get; set; }
        public string fabricante { get; set; }
        public string formaFarmaceutica { get; set; }
        public string dosagemExistente { get; set; }

    }
}
