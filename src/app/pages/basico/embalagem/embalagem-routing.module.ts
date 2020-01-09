import { EmbalagemGridComponent } from './embalagem-grid/embalagem-grid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: EmbalagemGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbalagemRoutingModule { }
