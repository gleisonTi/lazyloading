import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoGridComponent } from './pedido-grid/pedido-grid.component';
import { TabelaPrecoComponent } from '../tabela-preco/tabela-preco-grid/tabela-preco.component';

const routes: Routes = [
  { path: '', component: PedidoGridComponent },
  { path: 'modal', component: TabelaPrecoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
