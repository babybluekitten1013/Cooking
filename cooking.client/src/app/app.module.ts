import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './Recipes/recipe-detail/recipe-detail.component';
import { RecipeCardComponent } from './Recipes/recipe-card/recipe-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { IngredientComponent } from './Ingredient/ingredient-edit/ingredient-edit.component';
import { MeasurementComponent } from './Measurement/measurement-edit/measurement-edit.component';
import { MeasurementDetailComponent } from './Measurement/measurement-detail/measurement-detail.component';
import { IngredientDetailComponent } from './Ingredient/ingredient-detail/ingredient-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    CategoryListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeCardComponent,
    RecipeEditComponent,
    AboutMeComponent,
    IngredientComponent,
    MeasurementComponent,
    MeasurementDetailComponent,
    IngredientDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
