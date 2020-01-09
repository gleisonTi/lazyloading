import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { FabricanteRoutingModule } from './fabricante-routing.module';
import { FabricanteGridComponent } from './fabricante-grid/fabricante-grid.component';
import { FabricanteService } from './shared/fabricante.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    FabricanteRoutingModule
  ],
  providers:[FabricanteService]
})
export class FabricanteModule { }
