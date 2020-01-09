import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComposicaoGridComponent } from './produto-composicao-grid/produto-composicao-grid.component';
const routes: Routes = [
  {path:'',component:ProdutoComposicaoGridComponent,data:{
    title:'Composição do produto'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoComposicaoRoutingModule { }
