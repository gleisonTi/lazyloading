import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeGridComponent } from './unidade-grid/unidade-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UnidadeGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    UnidadeRoutingModule
  ]
})
export class UnidadeModule { }
