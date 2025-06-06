using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Cooking.Server.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Ingredient
    {
        [Required, Key] 
        public int IngredientID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }



    }
}
