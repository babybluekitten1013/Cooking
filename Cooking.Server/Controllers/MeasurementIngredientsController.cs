using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cooking.Server.Data;
using Cooking.Server.Models;

namespace Cooking.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementIngredientsController : ControllerBase
    {
        private readonly CookingDBContext _context;

        public MeasurementIngredientsController(CookingDBContext context)
        {
            _context = context;
        }

        // GET: api/MeasurementIngredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasurementIngredient>>> GetMesurementIngredients()
        {
            return await _context.MesurementIngredients.ToListAsync();
        }

        // GET: api/MeasurementIngredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementIngredient>> GetMeasurementIngredient(int id)
        {
            var measurementIngredient = await _context.MesurementIngredients.FindAsync(id);

            if (measurementIngredient == null)
            {
                return NotFound();
            }

            return measurementIngredient;
        }

        // PUT: api/MeasurementIngredients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeasurementIngredient(int id, MeasurementIngredient measurementIngredient)
        {
            if (id != measurementIngredient.MeasurementIngredientID)
            {
                return BadRequest();
            }

            _context.Entry(measurementIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasurementIngredientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MeasurementIngredients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MeasurementIngredient>> PostMeasurementIngredient(MeasurementIngredient measurementIngredient)
        {
            _context.MesurementIngredients.Add(measurementIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeasurementIngredient", new { id = measurementIngredient.MeasurementIngredientID }, measurementIngredient);
        }

        // DELETE: api/MeasurementIngredients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeasurementIngredient(int id)
        {
            var measurementIngredient = await _context.MesurementIngredients.FindAsync(id);
            if (measurementIngredient == null)
            {
                return NotFound();
            }

            _context.MesurementIngredients.Remove(measurementIngredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeasurementIngredientExists(int id)
        {
            return _context.MesurementIngredients.Any(e => e.MeasurementIngredientID == id);
        }
    }
}
