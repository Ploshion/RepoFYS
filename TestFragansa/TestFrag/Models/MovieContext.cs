using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TestFrag.Models;

public partial class MovieContext : DbContext
{
    public MovieContext()
    {
    }

    public MovieContext(DbContextOptions<MovieContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Actore> Actores { get; set; }

    public virtual DbSet<Directore> Directores { get; set; }

    public virtual DbSet<Genero> Generos { get; set; }

    public virtual DbSet<Paise> Paises { get; set; }

    public virtual DbSet<Pelicula> Peliculas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(local);Initial Catalog=Movie;Integrated Security=True;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actore>(entity =>
        {
            entity.HasKey(e => e.IdActor).HasName("PK__Actores__77018F4AA2E1B923");

            entity.Property(e => e.Apellido)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.PaisNavigation).WithMany(p => p.Actores)
                .HasForeignKey(d => d.Pais)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Actores_Paises");
        });

        modelBuilder.Entity<Directore>(entity =>
        {
            entity.HasKey(e => e.IdDirector).HasName("PK__Director__FE31570D2132A227");

            entity.Property(e => e.Apellido)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.IdGenero);

            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Paise>(entity =>
        {
            entity.HasKey(e => e.IdPais).HasName("PK__Paises__FC850A7B1425C02E");

            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Pelicula>(entity =>
        {
            entity.HasKey(e => e.IdPelicula).HasName("PK__Pelicula__60537FD0ECE07B62");

            entity.Property(e => e.CodigoTrailer)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.ImagenUrl)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.Reseña)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.Titulo)
                .IsRequired()
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.ActorNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.Actor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Peliculas_Actores");

            entity.HasOne(d => d.GeneroNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.Genero)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Peliculas_Generos");

            entity.HasOne(d => d.PaisNavigation).WithMany(p => p.Peliculas)
                .HasForeignKey(d => d.Pais)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Peliculas_Paises");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario);

            entity.Property(e => e.Clave)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Usuario1)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
