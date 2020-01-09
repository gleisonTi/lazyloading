import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

import { CategoryService } from '../shared/category.service';
import { Category } from '../category.model';


@Component({
  selector: 'incca-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
