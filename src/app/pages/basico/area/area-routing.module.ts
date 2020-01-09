import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaGridComponent } from './area-grid/area-grid.component';

const routes: Routes = [
  {path: '', component: AreaGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
