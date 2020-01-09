import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Grade } from './grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends BaseRecursoService<Grade> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/grades`, `${INCCA_WEB_URL}/basico/grade`,
      injector,
      Grade.fromJson);
  }

}
