import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariacaoImagemGridComponent } from './variacao-imagem-grid/variacao-imagem-grid.component';

const routes: Routes = [
  {path:'',component: VariacaoImagemGridComponent ,
  data: {
    title: 'Variação Imagem'
},
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariacaoImagemRoutingModule { }
