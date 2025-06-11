import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { AboutMeComponent } from './about-me/about-me.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
