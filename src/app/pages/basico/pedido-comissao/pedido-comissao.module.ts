import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComissaoRoutingModule } from './pedido-comissao-routing.module';
import { PedidoComissaoService } from './shared/pedido-comissao.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PedidoComissaoRoutingModule
  ],
  providers:[
    PedidoComissaoService
  ]
})
export class PedidoComissaoModule { }