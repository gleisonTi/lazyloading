import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoConsumoRoutingModule } from './produto-consumo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetorService } from '../setor/shared/setor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoConsumoRoutingModule
  ],
 // providers:[SetorService,]
})
export class ProdutoConsumoModule { }
