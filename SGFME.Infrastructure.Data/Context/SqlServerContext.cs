using Microsoft.EntityFrameworkCore;
using SGFME.Domain.Entidades;
using SGFME.Infrastructure.Data.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGFME.Infrastructure.Data.Context
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(DbContextOptions<SqlServerContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

<<<<<<< Updated upstream
        public DbSet<Paciente> pacientes { get; set; }//Replicar para as próximas entidades
=======
        public DbSet<Paciente> paciente { get; set; }//Replicar para as próximas entidades
        public DbSet<Contato> contato { get; set; }//Replicar para as próximas entidades
        public DbSet<TipoContato> tipocontato { get; set; }//Replicar para as próximas entidades
        public DbSet<CorRaca> corraca { get; set; }//Replicar para as próximas entidades
        public DbSet<Sexo> sexo { get; set; }//Replicar para as próximas entidades
        public DbSet<Status> status { get; set; }//Replicar para as próximas entidades
        public DbSet<EstadoCivil> estadocivil { get; set; }//Replicar para as próximas entidades
        public DbSet<Profissao> profissao { get; set; }//Replicar para as próximas entidades
        public DbSet<Endereco> endereco { get; set; }//Replicar para as próximas entidades
        public DbSet<Naturalidade> naturalidade { get; set; }//Replicar para as próximas entidades
        public DbSet<TipoEndereco> tipoendereco { get; set; }//Replicar para as próximas entidades
        public DbSet<Pessoa> pessoa { get; set; }//Replicar para as próximas entidades
        public DbSet<Cid> cid { get; set; }//Replicar para as próximas entidades
        public DbSet<EstabelecimentoSaude> estabelecimentosaude { get; set; }//Replicar para as próximas entidades
        public DbSet<Medico> medico { get; set; }//Replicar para as próximas entidades

>>>>>>> Stashed changes
        public DbSet<Medicamento> medicamento { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
<<<<<<< Updated upstream
            var stringConexao = @"Server=ANDRE;DataBase=SGFMEv1;integrated security=true;TrustServerCertificate=True;";
=======
            var stringConexao = @"Server=ANDRE;DataBase=SGFMEv76;integrated security=true;TrustServerCertificate=True;";
>>>>>>> Stashed changes
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(stringConexao);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Paciente>(new PacienteMapping().Configure);//Replicar para as próximas entidades
<<<<<<< Updated upstream
=======
            modelBuilder.Entity<Contato>(new ContatoMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<TipoContato>(new TipoContatoMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<CorRaca>(new CorRacaMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Sexo>(new SexoMapping().Configure);//Replicar para as próximas entidades
           
            modelBuilder.Entity<Status>(new StatusMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<EstadoCivil>(new EstadoCivilMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Profissao>(new ProfissaoMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Endereco>(new EnderecoMapping().Configure);//Replicar para as próximas entidades
            
            modelBuilder.Entity<Naturalidade>(new NaturalidadeMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<TipoEndereco>(new TipoEnderecoMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Pessoa>(new PessoaMapping().Configure);//Replicar para as próximas entidades

            modelBuilder.Entity<Cid>(new CidMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<EstabelecimentoSaude>(new EstabelecimentoSaudeMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Medico>(new MedicoMapping().Configure);//Replicar para as próximas entidades
>>>>>>> Stashed changes
            modelBuilder.Entity<Medicamento>(new MedicamentoMapping().Configure);

        }
    }
}
