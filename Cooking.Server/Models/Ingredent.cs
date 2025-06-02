using System.ComponentModel.DataAnnotations;

namespace Cooking.Server.Models
{
    public class Ingredent
    {
        [Required, Key] 
        public int IngredentID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }



    }
}
