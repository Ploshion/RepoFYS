using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestFrag.Entities;

public class Actores
{
    [Key]
    public int IdActor { get; set; }

    public string Nombre { get; set; }

    public string Apellido { get; set; }

    public int Pais { get; set; }

    [ForeignKey("Pais")]
    public virtual Paises Paises { get; set; }
}
