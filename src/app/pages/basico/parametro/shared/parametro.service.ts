import { Injectable, Injector } from '@angular/core';
import { Parametro } from './parametro.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametroService extends BaseRecursoService<Parametro> {

  public state: State;
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Parametros`, `${INCCA_WEB_URL}/basico/Parametro`,
      injector,
      Parametro.fromJson);
  }

  getAll(state?: State, queryId?:any): Observable<GridDataResult> {

    this.loadingService.showLoading();

    let query = '';
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}
    ?ParametroModulo=${queryId.modulo}&ParametroNome=${queryId.nome}&${query}`).pipe(
      catchError(this.handleError),
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          catchError(this.handleError),
          this.loadingService.hideLoading();
        }
      })
    );
  }

}
