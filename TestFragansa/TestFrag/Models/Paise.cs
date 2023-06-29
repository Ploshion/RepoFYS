using System;
using System.Collections.Generic;

namespace TestFrag.Models;

public partial class Paise
{
    public int IdPais { get; set; }

    public string Nombre { get; set; }

    public virtual ICollection<Actore> Actores { get; } = new List<Actore>();

    public virtual ICollection<Pelicula> Peliculas { get; } = new List<Pelicula>();
}
