import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaPrecoProdutoRoutingModule } from './tabela-preco-produto-routing.module';
import { TabelaPrecoProdutoGridComponent } from './tabela-preco-produto-grid/tabela-preco-produto-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TabelaPrecoProdutoRoutingModule
  ]
})
export class TabelaPrecoProdutoModule { }
