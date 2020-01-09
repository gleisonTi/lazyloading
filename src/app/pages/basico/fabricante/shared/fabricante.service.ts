import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { INCCA_WEB_URL } from '../../../../shared/services/api.inccaWeb';
import { tap, map } from 'rxjs/operators';
import { State, toDataSourceRequestString } from '@progress/kendo-data-query';
import { Help } from 'src/app/shared/models/help.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Fabricante } from './fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService extends BaseRecursoService<Fabricante> {
  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/fabricantes`, `${INCCA_WEB_URL}/basico/fabricante`,
      injector,
      Fabricante.fromJson);
  }

}
