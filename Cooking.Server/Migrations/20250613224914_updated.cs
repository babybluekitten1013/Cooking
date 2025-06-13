using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 1,
                columns: new[] { "Description", "PrepTime", "Yield" },
                values: new object[] { "This easy blueberry muffin recipe is our most popular for a reason! It’s quick to make and yields muffins with a moist, tender center bursting with blueberries and a perfectly golden-brown top. When baking this recipe, you can make 10 standard-size muffins, or fill the cups a bit more and make 8 larger muffins with big, beautiful bakery-style tops.", "10 minutes", 10 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 1,
                columns: new[] { "Description", "PrepTime", "Yield" },
                values: new object[] { "Pastery", "20 minutes", 24 });
        }
    }
}
