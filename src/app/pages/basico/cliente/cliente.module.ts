import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteGridComponent } from './cliente-grid/cliente-grid.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ClienteGridComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClienteRoutingModule
  ],
  exports:[
    ClienteFormComponent
  ]
})
export class ClienteModule { }
