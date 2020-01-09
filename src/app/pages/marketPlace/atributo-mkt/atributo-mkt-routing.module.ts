import { AtributoMktMarketPlace } from './atributo-mkt-grid/atributo-mkt-grid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AtributoMktMarketPlace
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtributoMktRoutingModule { }
