import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridRemoteComponent } from './grid-remote/grid-remote.component';

const routes: Routes = [
  { path: '', component: GridRemoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridRemoteBindingRoutingModule { }
