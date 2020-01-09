import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariacaoGridComponent } from './variacao-grid/variacao-grid.component';
import { SubVariacaoGridComponent } from './sub-variacao-grid/sub-variacao-grid.component';

const routes: Routes = [
  {
    path:'', component: VariacaoGridComponent,
    data: {
      title: 'Variação'
  },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariacaoRoutingModule { }
