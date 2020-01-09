import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoEstoqueRoutingModule } from './produto-estoque-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoEstoqueRoutingModule
  ]
})
export class ProdutoEstoqueModule { }
