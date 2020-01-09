import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbalagemRoutingModule } from './embalagem-routing.module';
import { EmbalagemGridComponent } from './embalagem-grid/embalagem-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmbalagemGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmbalagemRoutingModule
  ]
})
export class EmbalagemModule { }
