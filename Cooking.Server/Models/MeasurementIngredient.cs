using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
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
        [ValidateNever]
        public virtual Ingredient Ingredient { get; set; }

        [ForeignKey("MeasurementID")]
        [ValidateNever]
        public virtual Measurement Measurement { get; set; }

        [ForeignKey("RecipeID")]
        [ValidateNever]
        public virtual Recipe Recipe { get; set; }
    }
}