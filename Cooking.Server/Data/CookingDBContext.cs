using Cooking.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace Cooking.Server.Data
{
    public class CookingDBContext : DbContext
    {
        public CookingDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Recipe>().Navigation<MeasurementIngredient>(r => r.MeasurementIngredients).AutoInclude();
            modelBuilder.Entity<MeasurementIngredient>().Navigation<Measurement>(r => r.Measurement).AutoInclude();
            modelBuilder.Entity<MeasurementIngredient>().Navigation<Ingredient>(r => r.Ingredient).AutoInclude();

            //seed data
            // blueberry muffin
            int recipeId = 1;
            int ingredientId = 1;
            int measurementId = 1;
            int measurementingredientId = 1;

            var muffin = new Recipe
            {
                RecipeID = recipeId,
                Name = "Blueberry Muffin",
                RecipeTag = "Breakfast",
                Description = "This easy blueberry muffin recipe is our most popular for a reason! It’s quick to make and yields muffins with a moist, tender center bursting with blueberries and a perfectly golden-brown top. When baking this recipe, you can make 10 standard-size muffins, or fill the cups a bit more and make 8 larger muffins with big, beautiful bakery-style tops.",
                Instructions = "mix and cook! ENJOY!",
                PrepTime = "10 minutes",
                CookTime = "20 minutes",
                Yield = 10,
                ImageURL = "images/BlueberryMuffin.jpg"
            };

            modelBuilder.Entity<Recipe>().HasData(muffin);

            var blueberry = new Ingredient
            {
                IngredientID = ingredientId,
                Name = "Blueberry",
                Description = "Fruit"
            };

            modelBuilder.Entity<Ingredient>().HasData(blueberry);

            var cups = new Measurement
            {
                MeasurementID = measurementId,
                MeasurementName = "Cup"
            };

            modelBuilder.Entity<Measurement>().HasData(cups);

            var blueberryCups = new MeasurementIngredient
            {
                MeasurementIngredientID = measurementingredientId,
                MeasurementID = measurementId,
                IngredientID = ingredientId,
                RecipeID = recipeId,
                Quantity = 2,
                Details = "For Batter"
            };

            modelBuilder.Entity<MeasurementIngredient>().HasData(blueberryCups);
        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredents { get; set; }
        public DbSet<Measurement> Mesurements { get; set; }
        public DbSet<MeasurementIngredient> MesurementIngredients { get; set; }
    }
}
