import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenciaVariacaoRoutingModule } from './referencia-variacao-routing.module';
import { ReferenciaVariacaoService } from './shared/referencia-variacao.service';
import { VariacaoService } from '../variacao/shared/variacao.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { ChooseVariacaoComponent } from './choose-variacao/choose-variacao.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ReferenciaVariacaoRoutingModule
  ],

})
export class ReferenciaVariacaoModule { }
