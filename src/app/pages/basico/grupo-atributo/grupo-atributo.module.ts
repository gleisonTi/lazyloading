import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoAtributoRoutingModule } from './grupo-atributo-routing.module';
import { GrupoAtributoGridComponent } from './grupo-atributo-grid/grupo-atributo-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    GrupoAtributoRoutingModule
  ]
})
export class GrupoAtributoModule { }
