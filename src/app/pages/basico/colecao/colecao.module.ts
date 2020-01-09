import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { ColecaoRoutingModule } from './colecao-routing.module';

import { ColecaoService } from './shared/colecao.service';

import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ColecaoRoutingModule
  ],
  providers: [ ColecaoService ]
})
export class ColecaoModule { }
