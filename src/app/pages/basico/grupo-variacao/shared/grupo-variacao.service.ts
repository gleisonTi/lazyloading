import { Injectable, Injector } from '@angular/core';
import { GrupoVariacao } from './grupo-variacao.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupoVariacaoService  extends BaseRecursoService<GrupoVariacao> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/GruposVariacao`, `${INCCA_WEB_URL}/basico/GrupoVariacao`,
      injector,
      GrupoVariacao.fromJson);
  }


  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?GrupoId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

}
