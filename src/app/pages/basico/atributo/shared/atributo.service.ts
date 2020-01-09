import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Atributo } from './atributo.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtributoService extends BaseRecursoService<Atributo> {

  public state: State;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/atributos`, `${INCCA_WEB_URL}/basico/atributo`,
      injector,
      Atributo.fromJson);
  }


  getAll(state?: State, queryId?: any): Observable<GridDataResult> {
    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?AtributoIdPai=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public getNewOrdemAtributo(AtributoIdPai?:string): Observable<{ Codigo: number}> {

    return this.http.post<any>(`${INCCA_WEB_URL}/basico/GetNewOrdemAtributo`, JSON.stringify({AtributoIdPai})).pipe(map(res => res));
  }

}
