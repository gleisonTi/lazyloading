import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtributoRoutingModule } from './atributo-routing.module';
import { AtributoGridComponent } from './atributo-grid/atributo-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtributoService } from './shared/atributo.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AtributoGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    AtributoRoutingModule
  ],
  providers:[{
    deps: [Injector],
    provide: AtributoService,
    useFactory: (injector: Injector) => () => new AtributoService(injector)
  }]
})
export class AtributoModule { }
