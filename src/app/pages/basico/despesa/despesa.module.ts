import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaGridComponent } from './despesa-grid/despesa-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DespesaGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    DespesaRoutingModule
  ]
})
export class DespesaModule { }
