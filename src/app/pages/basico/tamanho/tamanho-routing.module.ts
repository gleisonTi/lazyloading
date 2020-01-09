import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TamanhoGridComponent } from './tamanho-grid/tamanho-grid.component';

const routes: Routes = [
  {path:'',component:TamanhoGridComponent,data:{
    title: 'Tamanho'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TamanhoRoutingModule { }
