import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetorGridComponent } from './setor-grid/setor-grid.component';

const routes: Routes = [
  {path:'',component:SetorGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }