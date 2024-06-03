using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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

        public DbSet<Paciente> paciente { get; set; }
        public DbSet<Contato> contato { get; set; }
        public DbSet<TipoContato> tipocontato { get; set; }
        public DbSet<CorRaca> corraca { get; set; }
        public DbSet<Sexo> sexo { get; set; }
        public DbSet<Status> status { get; set; }
        public DbSet<EstadoCivil> estadocivil { get; set; }
        public DbSet<Profissao> profissao { get; set; }
        public DbSet<Endereco> endereco { get; set; }
        public DbSet<Naturalidade> naturalidade { get; set; }
        public DbSet<TipoEndereco> tipoendereco { get; set; }
        public DbSet<Pessoa> pessoa { get; set; }
        public DbSet<Cid> cid { get; set; }
        public DbSet<EstabelecimentoSaude> estabelecimentosaude { get; set; } 
        public DbSet<Medico> medico { get; set; }
        public DbSet<Representante> representante { get; set; }
        public DbSet<Medicamento> medicamento { get; set; }
        public DbSet<Especialidade> especialidade { get; set; }






        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
<<<<<<< HEAD
            var stringConexao = @"Server=DELLG3GUSTAVO;DataBase=SGFMEv43;integrated security=true;TrustServerCertificate=True;";
=======
            var stringConexao = @"Server=ANDRE;DataBase=SGFMEv98;integrated security=true;TrustServerCertificate=True;";
>>>>>>> 872265d8a54747f84d53e2a22c96495a9aaa9e56
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(stringConexao)
                    .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information)
                    .EnableSensitiveDataLogging();
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Paciente>(new PacienteMapping().Configure);
            modelBuilder.Entity<Contato>(new ContatoMapping().Configure);
            modelBuilder.Entity<TipoContato>(new TipoContatoMapping().Configure);
            modelBuilder.Entity<CorRaca>(new CorRacaMapping().Configure);
            modelBuilder.Entity<Sexo>(new SexoMapping().Configure);
           
            modelBuilder.Entity<Status>(new StatusMapping().Configure);
            modelBuilder.Entity<EstadoCivil>(new EstadoCivilMapping().Configure);
            modelBuilder.Entity<Profissao>(new ProfissaoMapping().Configure);
            modelBuilder.Entity<Endereco>(new EnderecoMapping().Configure);
            
            modelBuilder.Entity<Naturalidade>(new NaturalidadeMapping().Configure);
            modelBuilder.Entity<TipoEndereco>(new TipoEnderecoMapping().Configure);
            modelBuilder.Entity<Pessoa>(new PessoaMapping().Configure);

            modelBuilder.Entity<Cid>(new CidMapping().Configure);
            modelBuilder.Entity<EstabelecimentoSaude>(new EstabelecimentoSaudeMapping().Configure);
            modelBuilder.Entity<Medico>(new MedicoMapping().Configure);

            modelBuilder.Entity<Representante>(new RepresentanteMapping().Configure);   
            modelBuilder.Entity<Medicamento>(new MedicamentoMapping().Configure);
            modelBuilder.Entity<Especialidade>(new EspecialidadeMapping().Configure);

        }
    }
}
