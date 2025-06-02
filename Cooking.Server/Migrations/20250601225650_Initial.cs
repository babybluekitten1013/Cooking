using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ingredents",
                columns: table => new
                {
                    IngredentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredents", x => x.IngredentID);
                });

            migrationBuilder.CreateTable(
                name: "Mesurements",
                columns: table => new
                {
                    MeasurementID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasurementName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesurements", x => x.MeasurementID);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecipeTag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instructions = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateTable(
                name: "MesurementIngredients",
                columns: table => new
                {
                    MeasurementIngredientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasurementID = table.Column<int>(type: "int", nullable: false),
                    IngredientID = table.Column<int>(type: "int", nullable: false),
                    RecipeID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MesurementIngredients", x => x.MeasurementIngredientID);
                    table.ForeignKey(
                        name: "FK_MesurementIngredients_Ingredents_IngredientID",
                        column: x => x.IngredientID,
                        principalTable: "Ingredents",
                        principalColumn: "IngredentID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MesurementIngredients_Mesurements_MeasurementID",
                        column: x => x.MeasurementID,
                        principalTable: "Mesurements",
                        principalColumn: "MeasurementID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MesurementIngredients_Recipes_RecipeID",
                        column: x => x.RecipeID,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Ingredents",
                columns: new[] { "IngredentID", "Description", "Name" },
                values: new object[] { 1, "Fruit", "Blueberry" });

            migrationBuilder.InsertData(
                table: "Mesurements",
                columns: new[] { "MeasurementID", "MeasurementName" },
                values: new object[] { 1, "Cup" });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "RecipeID", "Description", "Instructions", "Name", "RecipeTag" },
                values: new object[] { 1, "Pastery", "mix and cook! ENJOY!", "Blueberry Muffin", "Breakfast" });

            migrationBuilder.InsertData(
                table: "MesurementIngredients",
                columns: new[] { "MeasurementIngredientID", "Details", "IngredientID", "MeasurementID", "Quantity", "RecipeID" },
                values: new object[] { 1, "For Batter", 1, 1, 2.0, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_MesurementIngredients_IngredientID",
                table: "MesurementIngredients",
                column: "IngredientID");

            migrationBuilder.CreateIndex(
                name: "IX_MesurementIngredients_MeasurementID",
                table: "MesurementIngredients",
                column: "MeasurementID");

            migrationBuilder.CreateIndex(
                name: "IX_MesurementIngredients_RecipeID",
                table: "MesurementIngredients",
                column: "RecipeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MesurementIngredients");

            migrationBuilder.DropTable(
                name: "Ingredents");

            migrationBuilder.DropTable(
                name: "Mesurements");

            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
