import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovEstoqueGridComponent } from './mov-estoque-grid/mov-estoque-grid.component';

const routes: Routes = [
  { path: '', component: MovEstoqueGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovEstoqueRoutingModule { }
