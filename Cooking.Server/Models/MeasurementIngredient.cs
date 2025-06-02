using System.ComponentModel.DataAnnotations.Schema;

namespace Cooking.Server.Models
{
    public class MeasurementIngredient
    {
        public int MeasurementIngredientID { get; set; }
        public int MeasurementID { get; set; }
        public int IngredientID { get; set; }
        public int RecipeID { get; set; }
        public double Quantity { get; set; }
        public string? Details { get; set; }

        [ForeignKey("IngredientID")]
        public virtual Ingredent Ingredent { get; set; }

        [ForeignKey("MeasurementID")]
        public virtual Measurement Measurement { get; set; }

        [ForeignKey("RecipeID")]
        public virtual Recipe Recipe { get; set; }
    }
}