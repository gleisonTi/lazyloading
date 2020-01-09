import { Component } from '@angular/core';

import { Category } from 'src/app/core/categories/category.model';
import { CategoryService } from 'src/app/core/categories/shared/category.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';



@Component({
  selector: 'incca-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent extends BaseResourceListComponent<Category> {

  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }

}
