using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cooking.Server.Models
{
    public class MeasurementIngredient
    {
        public int MeasurementIngredientID { get; set; }
        public string IngredientName { get; set; }
        public string MeasurementName { get; set; }
        public int RecipeID { get; set; }
        public double Quantity { get; set; }
        public string? Details { get; set; }

        [ForeignKey("RecipeID")]
        [ValidateNever]
        public virtual Recipe Recipe { get; set; }
    }
}