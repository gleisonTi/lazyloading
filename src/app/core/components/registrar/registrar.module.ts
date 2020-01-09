import { GlobalService } from 'src/app/shared/services/global.sevice';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar.component';
import { RegistrarRoutingModule } from './registrar.routing.module';


@NgModule({
  declarations: [RegistrarComponent],
  imports: [
    CommonModule,
    RegistrarRoutingModule,
    SharedModule
  ],
  providers:[
    GlobalService
  ]
})

export class RegistrarModule { }
