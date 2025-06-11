import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { IngredientComponent } from './Ingredient/ingredient-edit/ingredient-edit.component';
import { MeasurementComponent } from './Measurement/measurement-edit/measurement-edit.component';
import { IngredientDetailComponent } from './Ingredient/ingredient-detail/ingredient-detail.component';
import { MeasurementDetailComponent } from './Measurement/measurement-detail/measurement-detail.component';

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "Categories",
    component: CategoryListComponent
  },
  {
    path: "Recipes",
    component: RecipeListComponent
  },
  {
    path: "Ingredient",
    component: IngredientDetailComponent
  },
  {
    path: "Measurement",
    component: MeasurementDetailComponent
  },
  {
    path: "About",
    component: AboutMeComponent
  },
  {
    path: "Recipes/create",
    component: RecipeEditComponent
  },
  {
    path: "Recipes/:id",
    component: RecipeDetailComponent
  },
  {
    path: "Recipes/:id/edit",
    component: RecipeEditComponent
  },
  {
    path: "Ingredient/:id/edit",
    component: IngredientComponent
  },
  {
    path: "Measurement/:id/edit",
    component: MeasurementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
