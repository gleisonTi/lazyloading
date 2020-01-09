import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCobrancaRoutingModule } from './tipo-cobranca-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TipoCobrancaRoutingModule
  ]
})
export class TipoCobrancaModule { }
