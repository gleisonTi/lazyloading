import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadeGridComponent } from './unidade-grid/unidade-grid.component';

const routes: Routes = [
  { path: '', component: UnidadeGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
