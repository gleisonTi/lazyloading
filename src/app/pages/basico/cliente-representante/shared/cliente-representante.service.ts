import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { ClienteRepresentante } from './cliente-representante.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteRepresentanteService extends BaseRecursoService<ClienteRepresentante> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ClienteRepresentantes`, `${INCCA_WEB_URL}/basico/ClienteRepresentante`,
      injector,
      ClienteRepresentante.fromJson);
  }

  getAll(state: State, queryId?: any): Observable<GridDataResult> {
    if(!queryId){
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ClienteId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

}
