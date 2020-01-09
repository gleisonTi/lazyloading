import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEstoqueRoutingModule } from './tipo-estoque-routing.module';
import { TipoEstoqueComponent } from './tipo-estoque/tipo-estoque.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TipoEstoqueComponent],
  imports: [
    CommonModule,
    SharedModule,
    TipoEstoqueRoutingModule
  ]
})
export class TipoEstoqueModule { }
