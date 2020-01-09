import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteContatoRoutingModule } from './cliente-contato-routing.module';
import { SharedModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ClienteContatoRoutingModule
  ]
})
export class ClienteContatoModule { }
