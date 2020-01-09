import { NgModule, Inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariacaoConsumoRoutingModule } from './variacao-consumo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VariacaoConsumoService } from './shared/variacao-consumo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    VariacaoConsumoRoutingModule,
    BrowserAnimationsModule
  ],
  providers:[{

    deps: [Injector],
    provide: VariacaoConsumoService,
    useFactory: (jsonp: Injector) => () => new VariacaoConsumoService(jsonp)
  }]
})
export class VariacaoConsumoModule { }
