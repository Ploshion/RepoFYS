using System;
using System.Collections.Generic;

namespace TestFrag.Models;

public partial class Pelicula
{
    public int IdPelicula { get; set; }

    public int Genero { get; set; }

    public int Pais { get; set; }

    public int Actor { get; set; }

    public int Director { get; set; }

    public string Titulo { get; set; }

    public string Reseña { get; set; }

    public string ImagenUrl { get; set; }

    public string CodigoTrailer { get; set; }

    public virtual Actore ActorNavigation { get; set; }

    public virtual Genero GeneroNavigation { get; set; }

    public virtual Paise PaisNavigation { get; set; }
}
