import { Injectable, Injector } from '@angular/core';
import { Area } from './area.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseRecursoService<Area> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Areas`, `${INCCA_WEB_URL}/basico/Area`,
      injector,
      Area.fromJson);
  }

}
