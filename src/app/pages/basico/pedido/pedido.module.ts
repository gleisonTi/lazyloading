import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PedidoGridComponent } from './pedido-grid/pedido-grid.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { ShowPedidoClienteComponent } from './pedido-form/show-pedido-cliente/show-pedido-cliente.component';

@NgModule({
  declarations: [PedidoGridComponent, PedidoFormComponent, ShowPedidoClienteComponent],
  imports: [
    CommonModule,
    SharedModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
