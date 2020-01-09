import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesGridComponent } from 'src/app/pages/categories-grid/categories-grid.component';


@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent, CategoriesGridComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
