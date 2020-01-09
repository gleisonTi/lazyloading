import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoSkuRoutingModule } from './produto-sku-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoSkuRoutingModule
  ]
})
export class ProdutoSkuModule { }
