import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

import { GridRemoteComponent } from './grid-remote/grid-remote.component';
import { RemoteBindingDirective } from './remote-binding.directive';

import { ProductsService } from './northwind.service';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [GridRemoteComponent, RemoteBindingDirective],
  imports: [
    SharedModule,
    HttpClientModule,
    GridModule
  ],
  providers: [ProductsService]
})
export class GridRemoteBindingModule { }
