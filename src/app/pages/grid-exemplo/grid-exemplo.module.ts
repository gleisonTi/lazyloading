import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GridexemploComponent } from './gridexemplo/gridexemplo.component';

import { EditService } from './edit.service';


@NgModule({
  declarations: [GridexemploComponent],
  imports: [
    SharedModule,
        HttpClientModule,
        HttpClientJsonpModule
  ],
  providers: [
    {
        deps: [HttpClient],
        provide: EditService,
        useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }
  ]
})
export class GridExemploModule { }
