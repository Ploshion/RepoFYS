using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestFrag.Entities;

namespace TestFrag.Controllers
{
    [ApiController]
    [Route("api/Pais")]
    [Authorize]
    public class PaisController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public PaisController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Paises>> Get()
        {
            var paises = await context.Paises.ToListAsync();
            return mapper.Map<List<Paises>>(paises);
        }


        [HttpGet("{Id}")]
        public async Task<Paises> GetById(int Id)
        {
            var paises = await context.Paises
            .FirstOrDefaultAsync(x => x.IdPais == Id);
            return paises;
        }


        [HttpPost]
        public async Task<ActionResult> Post(Paises datos)
        {

            var paises = mapper.Map<Paises>(datos);

            context.Add(paises);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<ActionResult> Put(Paises datos)
        {

            var existe = await context.Paises.AnyAsync(x => x.IdPais == datos.IdPais);

            if (!existe)
            {
                return NotFound();
            }

            var paises = mapper.Map<Paises>(datos);
            paises.IdPais = datos.IdPais;
            context.Update(paises);
            await context.SaveChangesAsync();
            return Ok();
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var existe = await context.Paises.AnyAsync(x => x.IdPais == Id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Paises() { IdPais = Id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
