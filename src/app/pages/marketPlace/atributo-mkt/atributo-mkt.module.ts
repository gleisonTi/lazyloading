import { AtributoMktMarketPlace } from './atributo-mkt-grid/atributo-mkt-grid.component';
import { AtributoService } from './../../basico/atributo/shared/atributo.service';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributoMktRoutingModule } from './atributo-mkt-routing.module';
import { AtributoMktService } from './shared/atributo-mkt.service';

@NgModule({
  declarations: [
    AtributoMktMarketPlace
  ],
  imports: [
    CommonModule,
    SharedModule,
    AtributoMktRoutingModule
  ],
  providers:[
    AtributoMktService,
    AtributoService
  ]
})
export class AtributoMktModule { }
