import { NgModule, Injector } from '@angular/core';
import { VariacaoRoutingModule } from './variacao-routing.module';
import { VariacaoGridComponent } from './variacao-grid/variacao-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VariacaoService } from './shared/variacao.service';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SubVariacaoGridComponent } from './sub-variacao-grid/sub-variacao-grid.component';
import { VariacaoConsumoGridComponent } from '../variacao-consumo/variacao-consumo-grid/variacao-consumo-grid.component';
import { VariacaoConsumoService } from '../variacao-consumo/shared/variacao-consumo.service';
import { ColecaoService } from '../colecao/shared/colecao.service';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [VariacaoGridComponent, SubVariacaoGridComponent, VariacaoConsumoGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    VariacaoRoutingModule,
  ],
  providers: [
    ColecaoService,
    {
      deps: [Injector],
      provide: VariacaoService,
      useFactory: (injector: Injector) => () => new VariacaoService(injector)// estudar
    },
    {
      deps: [Injector],
      provide: VariacaoConsumoService,
      useFactory: (injector: Injector) => () => new VariacaoConsumoService(injector)
    }
  ]
})
export class VariacaoModule { }
