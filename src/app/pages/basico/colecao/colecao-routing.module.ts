import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColecaoGridComponent } from './colecao-grid/colecao-grid.component';

const routes: Routes = [
  { path: '', component: ColecaoGridComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColecaoRoutingModule { }
