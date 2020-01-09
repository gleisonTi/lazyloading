import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoContatoRoutingModule } from './tipo-contato-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TipoContatoRoutingModule
  ]
})
export class TipoContatoModule { }
