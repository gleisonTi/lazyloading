import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoGridComponent } from './produto-grid/produto-grid.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { TabelaPrecoComponent } from '../tabela-preco/tabela-preco-grid/tabela-preco.component';

const routes: Routes = [
  {
    path: '', component: ProdutoGridComponent, data: {
      title: "Cadastro de Produto"
    }
  },
  {
    path: 'formularioCadastro',
    component: ProdutoFormComponent,
    outlet: 'cadFor'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
