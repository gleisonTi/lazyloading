import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoCobrancaComponent } from './tipo-cobranca-grid/tipo-cobranca.component';

const routes: Routes = [
  { path: '', component: TipoCobrancaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCobrancaRoutingModule { }
