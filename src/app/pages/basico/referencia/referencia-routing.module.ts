import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenciaGridComponent } from './referencia-grid/referencia-grid.component';

const routes: Routes = [
  {path: '', component: ReferenciaGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenciaRoutingModule { }
