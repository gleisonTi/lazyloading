import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TamanhoRoutingModule } from './tamanho-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TamanhoService } from './shared/tamanho.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TamanhoRoutingModule
  ],
  providers:[{
    deps: [Injector],
    provide: TamanhoService,
    useFactory: (injector: Injector) => () => new TamanhoService(injector)
  }]
})
export class TamanhoModule { }
