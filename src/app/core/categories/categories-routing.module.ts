import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { CategoriesGridComponent } from 'src/app/pages/categories-grid/categories-grid.component';




const routes: Routes = [
  { path: '', component: CategoriesGridComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: ':id/edit', component: CategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
