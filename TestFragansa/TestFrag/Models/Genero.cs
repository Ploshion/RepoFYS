using System;
using System.Collections.Generic;

namespace TestFrag.Models;

public partial class Genero
{
    public int IdGenero { get; set; }

    public string Nombre { get; set; }

    public virtual ICollection<Pelicula> Peliculas { get; } = new List<Pelicula>();
}
