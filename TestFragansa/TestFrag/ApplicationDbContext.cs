using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Actores> Actores { get; set; }

        public DbSet<Directores> Directores { get; set; }

        public DbSet<Generos> Generos { get; set; }

        public DbSet<Paises> Paises { get; set; }

        public DbSet<Peliculas> Peliculas { get; set; }
                
    }
}
