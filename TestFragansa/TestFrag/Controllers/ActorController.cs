using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag.Controllers
{

    [ApiController]
    [Route("api/Actores")]
    // [Authorize]
    public class ActorController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ActorController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Actores>> Get()
        {
            var actores = await context.Actores
                .Include(x => x.Paises)
                .ToListAsync();
            return mapper.Map<List<Actores>>(actores);
        }

        [HttpGet("{Id}")]
        public async Task<Actores> GetById(int Id)
        {
            var actores = await context.Actores
            .Include(x => x.Paises)
            .FirstOrDefaultAsync(x => x.IdActor == Id);

            return actores;
        }


        [HttpPost]
        public async Task<ActionResult> Post(Actores datos)
        {

            var actores = mapper.Map<Actores>(datos);

            context.Add(actores);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Put(Actores datos)
        {

            var existe = await context.Actores.AnyAsync(x => x.IdActor == datos.IdActor);

            if (!existe)
            {
                return NotFound();
            }

            var actores = mapper.Map<Actores>(datos);
            actores.IdActor = datos.IdActor;
            context.Update(actores);
            await context.SaveChangesAsync();
            return Ok();
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var existe = await context.Actores.AnyAsync(x => x.IdActor == Id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Actores() { IdActor = Id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
