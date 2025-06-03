using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixCols : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IngredentID",
                table: "Ingredents",
                newName: "IngredientID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IngredientID",
                table: "Ingredents",
                newName: "IngredentID");
        }
    }
}
