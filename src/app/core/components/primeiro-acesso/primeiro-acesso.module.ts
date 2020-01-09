import { PrimeiroAcessoComponent } from './primeiro-acesso.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeiroAcessoRoutingModule } from './primeiro-acesso.routing.module';

@NgModule({
  declarations: [PrimeiroAcessoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrimeiroAcessoRoutingModule,
  ],
  exports:[
    PrimeiroAcessoComponent
  ]
})

export class PrimeiroAcessoModule { }
