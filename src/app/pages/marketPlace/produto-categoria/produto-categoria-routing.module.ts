import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoCategoriaGridComponent } from './produto-categoria-grid/produto-categoria-grid.component';

const routes: Routes = [
  {
    path:'', component: ProdutoCategoriaGridComponent, data: {
    title: 'Categoria do Produto'
    },
  },
  // {
  //   path: 'produtocategoria',
  //   loadChildren: './pages/basico/produto-categoria/produto-categoria.module#ProdutoCategoriaModule',
  //   data: {
  //     title: 'Produto Categoria'
  //   },
  // },
  // {
  //   path: 'produtocomposicao',
  //   loadChildren:'./pages/basico/produto-composicao/produto-composicao.module#ProdutoComposicaoModule',
  //   data: {
  //     title: 'Produto Composição'
  //   },
  // },
  // {
  //   path: 'produtoimagem',
  //   loadChildren:'./pages/basico/produto-imagem/produto-imagem.module#ProdutoImagemModule',
  //   data: {
  //     title: 'Produto Imagem'
  //   },
  //},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoCategoriaRoutingModule { }
