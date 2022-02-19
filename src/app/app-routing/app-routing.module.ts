import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipesComponent } from '../recipes/recipes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: ':id/details', component: RecipesComponent }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent, },
  //{ path: 'shopping-list', component: ShoppingListComponent, },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
