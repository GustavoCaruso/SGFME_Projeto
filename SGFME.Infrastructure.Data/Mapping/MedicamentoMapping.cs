using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGFME.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Nome, principio ativo, lote, validade, fabricante, forma farmaceutica,
//dosagens existentes.

namespace SGFME.Infrastructure.Data.Mapping
{
    public class MedicamentoMapping : IEntityTypeConfiguration<Medicamento>
    {
        public void Configure(EntityTypeBuilder<Medicamento> builder) {

            builder.ToTable("Medicamento");
            builder.HasKey(prop => prop.id);

            builder.Property(prop => prop.nome)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("nome")
            .HasColumnType("varchar(255)");

            builder.Property(prop => prop.principioAtivo)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("principioAtivo")
            .HasColumnType("varchar(255)");

            builder.Property(prop => prop.lote)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("lote")
            .HasColumnType("varchar(255)");

            builder.Property(prop => prop.dataValidade)
            .IsRequired()
            .HasColumnName("dataValidade")
            .HasColumnType("datetime");

            builder.Property(prop => prop.fabricante)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("fabricante")
            .HasColumnType("varchar(255)");

            builder.Property(prop => prop.formaFarmaceutica)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("formaFarmaceutica")
            .HasColumnType("varchar(255)");

            builder.Property(prop => prop.dosagemExistente)
            .HasConversion(prop => prop.ToString(), prop => prop)
            .IsRequired()
            .HasColumnName("dosagemExistente")
            .HasColumnType("varchar(255)");

        }
    }
}
