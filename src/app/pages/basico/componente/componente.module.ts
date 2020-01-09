import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteRoutingModule } from './componente-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponenteRoutingModule,
    SharedModule
  ]
})
export class ComponenteModule { }