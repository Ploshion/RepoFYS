using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestFrag.Entities;

public class Directores
{
    [Key]
    public int IdDirector { get; set; }

    public string Nombre { get; set; }

    public string Apellido { get; set; }
       
    public int IdPais { get; set; }
    [ForeignKey("IdPais")]
    public virtual Paises Paises { get; set; }
       
}
