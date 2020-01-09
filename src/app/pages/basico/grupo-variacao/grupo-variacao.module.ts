import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoVariacaoRoutingModule } from './grupo-variacao-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    GrupoVariacaoRoutingModule
  ]
})
export class GrupoVariacaoModule { }
