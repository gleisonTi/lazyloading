import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaPrecoComponent } from './tabela-preco-grid/tabela-preco.component';

const routes: Routes = [
  { path: '', component: TabelaPrecoComponent },
  {
    path: "modal",
    component: TabelaPrecoComponent,
    outlet: "pesquisa"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelaPrecoRoutingModule { }
