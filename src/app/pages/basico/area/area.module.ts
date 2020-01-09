import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaGridComponent } from './area-grid/area-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AreaGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    AreaRoutingModule
  ]
})
export class AreaModule { }
