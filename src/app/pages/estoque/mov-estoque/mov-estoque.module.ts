import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovEstoqueRoutingModule } from './mov-estoque-routing.module';
import { MovEstoqueGridComponent } from './mov-estoque-grid/mov-estoque-grid.component';

@NgModule({
  declarations: [MovEstoqueGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    MovEstoqueRoutingModule
  ]
})
export class MovEstoqueModule { }
