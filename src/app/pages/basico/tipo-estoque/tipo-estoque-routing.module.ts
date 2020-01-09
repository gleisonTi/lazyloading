import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoEstoqueComponent } from './tipo-estoque/tipo-estoque.component';

const routes: Routes = [
  {path:'',component:TipoEstoqueComponent,data:{
    title: 'Tipo de Estoque'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoEstoqueRoutingModule { }
