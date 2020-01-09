import { CategoriaMktService } from './referencia-mkt-form/referencia-mkt-form-tabstrip-categoria/shared/referencia-categoria-mkt.service';
import { ReferenciaMktForm } from './referencia-mkt-form/referencia-mkt-form.component';
import { CategoriaService } from './../categoria/shared/categoria.service';
import { ReferenciaMktGridComponent } from './referencia-mkt-grid/referencia-mkt-grid.component';
import { ReferenciaService } from './../../basico/referencia/shared/referencia.service';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenciaMktRoutingModule } from './referencia-mkt-routing.module';
import { ReferenciaMktService } from './shared/referencia-mkt.service'
import { ReferenciaMktFormTabstripCategoria} from './referencia-mkt-form/referencia-mkt-form-tabstrip-categoria/referencia-mkt-form-tabstrip-categoria.component'

@NgModule({
  declarations: [
    ReferenciaMktGridComponent,
    ReferenciaMktForm,
    ReferenciaMktFormTabstripCategoria
  ],
  imports: [
    ReferenciaMktRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers:[
    ReferenciaService,
    CategoriaService,
    ReferenciaMktService,
    CategoriaMktService
  ]
})


export class ReferenciaMktModule { }
