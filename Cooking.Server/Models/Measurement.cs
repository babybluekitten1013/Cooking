using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Cooking.Server.Models
{
    [Index(nameof(MeasurementName), IsUnique = true)]
    public class Measurement
    {
        [Required, Key]
        public int MeasurementID { get; set; }
        public string MeasurementName { get; set; }
    }
}
