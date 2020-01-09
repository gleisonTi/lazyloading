import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenciaRoutingModule } from './referencia-routing.module';
import { ReferenciaGridComponent } from './referencia-grid/referencia-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReferenciaFormComponent } from './referencia-form/referencia-form.component';
import { VariacaoService } from '../variacao/shared/variacao.service';
import { ReferenciaVariacaoService } from '../referencia-variacao/shared/referencia-variacao.service';
import { HttpClient } from '@angular/common/http';
import { ReferenciaAtributoService } from '../referencia-atributo/shared/referencia-atributo.service';
import { AtributoService } from '../atributo/shared/atributo.service';

@NgModule({
  declarations: [ReferenciaGridComponent, ReferenciaFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReferenciaRoutingModule
  ],
  providers:[
    {
    deps: [Injector],
    provide: ReferenciaVariacaoService,
    useFactory: (injector: Injector) => () => new ReferenciaVariacaoService(injector)
  },
    {
    deps: [Injector],
    provide: VariacaoService,
    useFactory: (injector: Injector) => () => new VariacaoService(injector)// estudar
    },
    {
    deps: [Injector],
    provide: ReferenciaAtributoService,
    useFactory: (injector: Injector) => () => new ReferenciaAtributoService(injector)
  },
    {
    deps: [Injector],
    provide: AtributoService,
    useFactory: (injector: Injector) => () => new AtributoService(injector)// estudar
    },
  ]

})
export class ReferenciaModule { }
