import { CondicaoPagamentoGridComponent } from './condicao-pagamento-grid/condicao-pagamento-grid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CondicaoPagamentoGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicaoPagamentoRoutingModule { }
