import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';

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
    path: "Recipes/:id",
    component: RecipeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
