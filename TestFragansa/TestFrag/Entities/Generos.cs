using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestFrag.Entities;

public partial class Generos
{
    [Key]
    public int IdGenero { get; set; }

    public string Nombre { get; set; }
}
