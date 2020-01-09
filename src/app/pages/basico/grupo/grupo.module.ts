import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoGridComponent } from './grupo-grid/grupo-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';

@NgModule({
  declarations: [GrupoGridComponent, GrupoFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    GrupoRoutingModule
  ]
})
export class GrupoModule { }
