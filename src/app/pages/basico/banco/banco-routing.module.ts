import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoGridComponent } from './banco-grid/banco-grid.component';

const routes: Routes = [
  { path: '', component: BancoGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
