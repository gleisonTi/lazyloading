import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { INCCA_WEB_URL,   } from '../../../../shared/services/api.inccaWeb';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { Variacao } from './variacao.model';

import { ToastrService } from 'ngx-toastr';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { toDataSourceRequestString, State } from '@progress/kendo-data-query';
import { Help } from 'src/app/shared/models/help.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';


@Injectable()
export class VariacaoService extends  BaseRecursoService<Variacao> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Variacoes`, `${INCCA_WEB_URL}/basico/Variacao`,
      injector,
      Variacao.fromJson);
  }

  getAll(state?: State, queryId?:any): Observable<GridDataResult> {

    this.loadingService.showLoading();

    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?VariacaoIdPai=${queryId}&${query}`).pipe(
      catchError(this.handleError),
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          //faça aqui seu tratamento de erro
          catchError(this.handleError),
          this.loadingService.hideLoading();
        }
      })
    );
  }


}

