import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComposicaoRoutingModule } from './produto-composicao-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VariacaoService } from '../variacao/shared/variacao.service';
@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoComposicaoRoutingModule
  ],
  providers:[VariacaoService]

})
export class ProdutoComposicaoModule { }
