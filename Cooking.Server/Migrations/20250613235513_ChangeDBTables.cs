using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cooking.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDBTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MesurementIngredients_Ingredents_IngredientID",
                table: "MesurementIngredients");

            migrationBuilder.DropForeignKey(
                name: "FK_MesurementIngredients_Mesurements_MeasurementID",
                table: "MesurementIngredients");

            migrationBuilder.DropTable(
                name: "Ingredents");

            migrationBuilder.DropTable(
                name: "Mesurements");

            migrationBuilder.DropIndex(
                name: "IX_MesurementIngredients_IngredientID",
                table: "MesurementIngredients");

            migrationBuilder.DropIndex(
                name: "IX_MesurementIngredients_MeasurementID",
                table: "MesurementIngredients");

            migrationBuilder.DropColumn(
                name: "IngredientID",
                table: "MesurementIngredients");

            migrationBuilder.DropColumn(
                name: "MeasurementID",
                table: "MesurementIngredients");

            migrationBuilder.AddColumn<string>(
                name: "IngredientName",
                table: "MesurementIngredients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MeasurementName",
                table: "MesurementIngredients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "MesurementIngredients",
                keyColumn: "MeasurementIngredientID",
                keyValue: 1,
                columns: new[] { "IngredientName", "MeasurementName" },
                values: new object[] { "Flour", "Cup" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientName",
                table: "MesurementIngredients");

            migrationBuilder.DropColumn(
                name: "MeasurementName",
                table: "MesurementIngredients");

            migrationBuilder.AddColumn<int>(
                name: "IngredientID",
                table: "MesurementIngredients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MeasurementID",
                table: "MesurementIngredients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Ingredents",
                columns: table => new
                {
                    IngredientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredents", x => x.IngredientID);
                });

            migrationBuilder.CreateTable(
                name: "Mesurements",
                columns: table => new
                {
                    MeasurementID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasurementName = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesurements", x => x.MeasurementID);
                });

            migrationBuilder.InsertData(
                table: "Ingredents",
                columns: new[] { "IngredientID", "Description", "Name" },
                values: new object[] { 1, "Fruit", "Blueberry" });

            migrationBuilder.UpdateData(
                table: "MesurementIngredients",
                keyColumn: "MeasurementIngredientID",
                keyValue: 1,
                columns: new[] { "IngredientID", "MeasurementID" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "Mesurements",
                columns: new[] { "MeasurementID", "MeasurementName" },
                values: new object[] { 1, "Cup" });

            migrationBuilder.CreateIndex(
                name: "IX_MesurementIngredients_IngredientID",
                table: "MesurementIngredients",
                column: "IngredientID");

            migrationBuilder.CreateIndex(
                name: "IX_MesurementIngredients_MeasurementID",
                table: "MesurementIngredients",
                column: "MeasurementID");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredents_Name",
                table: "Ingredents",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mesurements_MeasurementName",
                table: "Mesurements",
                column: "MeasurementName",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MesurementIngredients_Ingredents_IngredientID",
                table: "MesurementIngredients",
                column: "IngredientID",
                principalTable: "Ingredents",
                principalColumn: "IngredientID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MesurementIngredients_Mesurements_MeasurementID",
                table: "MesurementIngredients",
                column: "MeasurementID",
                principalTable: "Mesurements",
                principalColumn: "MeasurementID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
