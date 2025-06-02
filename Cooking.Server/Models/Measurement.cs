using System.ComponentModel.DataAnnotations;

namespace Cooking.Server.Models
{
    public class Measurement
    {
        [Required, Key] 
        public int MeasurementID { get; set; }
        public string MeasurementName { get; set; }
    }
}
