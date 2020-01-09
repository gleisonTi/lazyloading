import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteGridComponent } from './cliente-grid/cliente-grid.component';

const routes: Routes = [
  { path: '', component: ClienteGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
