import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRepresentanteRoutingModule } from './cliente-representante-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ClienteRepresentanteRoutingModule
  ]
})
export class ClienteRepresentanteModule { }
