import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoImagemRoutingModule } from './produto-imagem-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoImagemRoutingModule
  ]
})
export class ProdutoImagemModule { }
