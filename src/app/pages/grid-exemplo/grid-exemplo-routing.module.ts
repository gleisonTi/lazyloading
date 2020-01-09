import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridexemploComponent } from './gridexemplo/gridexemplo.component';

const routes: Routes = [
  { path: '', component: GridexemploComponent, data: {
    title: 'Grid de Exemplo'
  } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridExemploRoutingModule { }
