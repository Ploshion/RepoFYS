using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag.Controllers
{
    [ApiController]
    [Route("api/Genero")]
    // [Authorize]
    public class GeneroController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GeneroController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Generos>> Get()
        {
            var generos = await context.Generos.ToListAsync();
            return mapper.Map<List<Generos>>(generos);
        }


        [HttpGet("{Id}")]
        public async Task<Generos> GetById(int Id)
        {
            var generos = await context.Generos
            .FirstOrDefaultAsync(x => x.IdGenero == Id);
            return generos;
        }

        [HttpPost]
        public async Task<ActionResult> Post(Generos datos)
        {

            var generos = mapper.Map<Generos>(datos);

            context.Add(generos);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Put(Generos datos)
        {

            var existe = await context.Generos.AnyAsync(x => x.IdGenero == datos.IdGenero);

            if (!existe)
            {
                return NotFound();
            }

            var generos = mapper.Map<Generos>(datos);
            generos.IdGenero = datos.IdGenero;
            context.Update(generos);
            await context.SaveChangesAsync();
            return Ok();
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var existe = await context.Generos.AnyAsync(x => x.IdGenero == Id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Generos() { IdGenero = Id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
