import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetorRoutingModule } from './setor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SetorRoutingModule
  ]
})
export class SetorModule { }
