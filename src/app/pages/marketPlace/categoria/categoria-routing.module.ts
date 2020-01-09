import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaGridComponent } from './categoria-grid/categoria-grid.component';

const routes: Routes = [
  { path: '', component: CategoriaGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }