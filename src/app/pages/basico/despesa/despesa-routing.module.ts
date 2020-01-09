import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespesaGridComponent } from './despesa-grid/despesa-grid.component';

const routes: Routes = [
  { path: '', component: DespesaGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }
