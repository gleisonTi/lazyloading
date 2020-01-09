import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoGridComponent } from './produto-grid/produto-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
  declarations: [ProdutoGridComponent, ProdutoFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule { }
