import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenciaMktGridComponent } from './referencia-mkt-grid/referencia-mkt-grid.component';

const routes: Routes = [{
  path: '', component: ReferenciaMktGridComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenciaMktRoutingModule { }
