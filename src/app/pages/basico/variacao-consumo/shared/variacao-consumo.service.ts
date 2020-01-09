import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { INCCA_WEB_URL, } from "../../../../shared/services/api.inccaWeb";
import { VariacaoConsumo } from './variacao-consumo.model';
import { tap } from 'rxjs/operators/tap';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Variacao } from '../../variacao/shared/variacao.model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VariacaoConsumoService extends BaseRecursoService<Variacao> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/VariacoesConsumo`, `${INCCA_WEB_URL}/basico/VariacaoConsumo`,
      injector,
      Variacao.fromJson);
  }

  getAll(state?: State, queryId?: any): Observable<GridDataResult> {
    this.loadingService.showLoading();
    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?VariacaoId=${queryId}&${query}`).pipe(
      catchError(this.handleError),
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          this.loadingService.hideLoading();
        }
      })
    );
  }


}

