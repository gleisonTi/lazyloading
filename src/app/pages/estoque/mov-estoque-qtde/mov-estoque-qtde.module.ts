import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovEstoqueQtdeRoutingModule } from './mov-estoque-qtde-routing.module';
import { MovEstoqueQtdeGridComponent } from './mov-estoque-qtde-grid/mov-estoque-qtde-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    MovEstoqueQtdeRoutingModule
  ]
})
export class MovEstoqueQtdeModule { }
