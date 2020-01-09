import { ClienteModule } from './../cliente/cliente.module';
import { ClienteFormComponent } from './../cliente/cliente-form/cliente-form.component';
import { AgendaService } from './shared/agenda.service';
import { ClienteService } from './../cliente/shared/cliente.service';
import { AgendaRoutingModule } from './agenda-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgendaGridComponent } from './agenda-grid/agenda-grid.component';

@NgModule({
  declarations: [
    AgendaGridComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgendaRoutingModule,
    ClienteModule
  ],
  providers:[
    AgendaService
  ],
  entryComponents:[
    ClienteFormComponent
  ]
})
export class AgendaModule { }
