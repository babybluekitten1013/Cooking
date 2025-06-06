using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;


namespace Cooking.Server.Models
{
    public class Recipe
    {
        [Required, Key] 
        public int RecipeID { get; set; }
        public string Name { get; set; }
        public string? RecipeTag { get; set; }
        public string? Description { get; set; }
        public string Instructions { get; set; }
        public string? PrepTime { get; set; }
        public string? CookTime { get; set; }
        public int? Yield { get; set; }
        public string ImageURL { get; set; }

        public ICollection<MeasurementIngredient> MeasurementIngredients { get; set; }
    }
}
