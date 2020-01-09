import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoItemRoutingModule } from './pedido-item-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    PedidoItemRoutingModule
  ]
})
export class PedidoItemModule { }
