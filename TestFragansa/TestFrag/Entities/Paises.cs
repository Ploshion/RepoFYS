using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestFrag.Entities;

public class Paises
{
    [Key]
    public int IdPais { get; set; }

    public string Nombre { get; set; }
        
}
