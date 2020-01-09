import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoRoutingModule } from './banco-routing.module';
import { BancoGridComponent } from './banco-grid/banco-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BancoGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    BancoRoutingModule
  ]
})
export class BancoModule { }
