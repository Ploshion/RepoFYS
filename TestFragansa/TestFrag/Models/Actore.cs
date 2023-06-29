using System;
using System.Collections.Generic;

namespace TestFrag.Models;

public partial class Actore
{
    public int IdActor { get; set; }

    public string Nombre { get; set; }

    public string Apellido { get; set; }

    public int Pais { get; set; }

    public virtual Paise PaisNavigation { get; set; }

    public virtual ICollection<Pelicula> Peliculas { get; } = new List<Pelicula>();
}
