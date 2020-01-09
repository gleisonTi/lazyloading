import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondicaoPagamentoRoutingModule } from './condicao-pagamento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CondicaoPagamentoRoutingModule,
    SharedModule
  ]
})
export class CondicaoPagamentoModule { }