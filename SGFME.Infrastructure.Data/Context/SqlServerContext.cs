﻿using Microsoft.EntityFrameworkCore;
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

        public DbSet<Paciente> pacientes { get; set; }//Replicar para as próximas entidades
        public DbSet<Medicamento> medicamento { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var stringConexao = @"Server=ANDRE;DataBase=SGFMEv1;integrated security=true;TrustServerCertificate=True;";
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(stringConexao);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Paciente>(new PacienteMapping().Configure);//Replicar para as próximas entidades
            modelBuilder.Entity<Medicamento>(new MedicamentoMapping().Configure);

        }
    }
}