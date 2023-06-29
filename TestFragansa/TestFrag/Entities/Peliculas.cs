using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestFrag.Entities;

public class Peliculas
{
    [Key]
    public int IdPelicula { get; set; }

    public int Genero { get; set; }

    public int Pais { get; set; }

    public int Actor { get; set; }

    public int Director { get; set; }

    public string Titulo { get; set; }

    public string Reseña { get; set; }

    public string ImagenUrl { get; set; }

    public string CodigoTrailer { get; set; }
}
