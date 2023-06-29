using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag.Controllers
{

    [ApiController]
    [Route("api/Director")]
    // [Authorize]
    public class DirectorController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public DirectorController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Directores>> Get()
        {
            var directores = await context.Directores
                .Include(x => x.Paises)
                .ToListAsync();
            return mapper.Map<List<Directores>>(directores);
        }


        [HttpGet("{Id}")]
        public async Task<Directores> GetById(int Id)
        {
            var directores = await context.Directores
            .Include(x => x.Paises)
            .FirstOrDefaultAsync(x => x.IdDirector == Id);

            return directores;
        }



        [HttpPost]
        public async Task<ActionResult> Post(Directores datos)
        {

            var directores = mapper.Map<Directores>(datos);

            context.Add(directores);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Put(Directores datos)
        {

            var existe = await context.Directores.AnyAsync(x => x.IdDirector == datos.IdDirector);

            if (!existe)
            {
                return NotFound();  
            }

            var directores = mapper.Map<Directores>(datos);
            directores.IdDirector = datos.IdDirector;
            context.Update(directores);
            await context.SaveChangesAsync();
            return Ok();
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var existe = await context.Directores.AnyAsync(x => x.IdDirector == Id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Directores() { IdDirector = Id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
