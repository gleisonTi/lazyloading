import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariacaoImagemRoutingModule } from './variacao-imagem-routing.module';
import { VariacaoImagemGridComponent } from './variacao-imagem-grid/variacao-imagem-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    VariacaoImagemRoutingModule
  ]
})
export class VariacaoImagemModule { }
