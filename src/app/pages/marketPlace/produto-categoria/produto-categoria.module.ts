import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoCategoriaRoutingModule } from './produto-categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoCategoriaRoutingModule
  ]
})

export class ProdutoCategoriaModule {}

