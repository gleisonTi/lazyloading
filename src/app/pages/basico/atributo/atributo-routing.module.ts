import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtributoGridComponent } from './atributo-grid/atributo-grid.component';

const routes: Routes = [
  {path:'',component:AtributoGridComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtributoRoutingModule { }
