using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag.Controllers
{
    [ApiController]
    [Route("api/Peliculas")]
    [Authorize]
    public class PeliculaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public PeliculaController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Peliculas>> Get()
        {
            var peliculas = await context.Peliculas.ToListAsync();
            return mapper.Map<List<Peliculas>>(peliculas);
        }

        [HttpGet("{Id}")]
        public async Task<Peliculas> GetById(int Id)
        {
            var pelicula = await context.Peliculas
            .FirstOrDefaultAsync(x => x.IdPelicula == Id);

            return pelicula;
        }


        [HttpPost]
        public async Task<ActionResult> Post(Peliculas datos)
        {

            var peliculas = mapper.Map<Peliculas>(datos);

            context.Add(peliculas);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Put(Peliculas datos)
        {

            var existe = await context.Peliculas.AnyAsync(x => x.IdPelicula == datos.IdPelicula);

            if (!existe)
            {
                return NotFound();
            }

            var peliculas = mapper.Map<Peliculas>(datos);
            peliculas.IdPelicula = datos.IdPelicula;
            context.Update(peliculas);
            await context.SaveChangesAsync();
            return Ok();
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var existe = await context.Peliculas.AnyAsync(x => x.IdPelicula == Id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Peliculas() { IdPelicula = Id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
