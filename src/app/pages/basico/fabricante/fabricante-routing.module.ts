import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricanteGridComponent } from './fabricante-grid/fabricante-grid.component';


const routes: Routes = [
   { path: '', component: FabricanteGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
