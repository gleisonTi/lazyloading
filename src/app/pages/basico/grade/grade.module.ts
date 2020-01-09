import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GradeGridComponent } from './grade-grid/grade-grid.component';
import { GradeService } from './shared/grade.service';
import { TamanhoService } from '../tamanho/shared/tamanho.service';

@NgModule({
  declarations: [GradeGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    GradeRoutingModule
  ],
  providers:[{
    deps: [Injector],
    provide: GradeService,
    useFactory: (injector: Injector) => () => new GradeService(injector)
  },
  {
    deps: [Injector],
    provide: TamanhoService,
    useFactory: (injector: Injector) => () => new TamanhoService(injector)
  }
]
})
export class GradeModule { }
