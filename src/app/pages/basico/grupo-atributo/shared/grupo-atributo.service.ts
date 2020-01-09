import { Injectable, Injector } from '@angular/core';
import { GrupoAtributo } from './grupo-atributo.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupoAtributoService extends BaseRecursoService<GrupoAtributo> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/GruposAtributo`, `${INCCA_WEB_URL}/basico/GrupoAtributo`,
      injector,
      GrupoAtributo.fromJson);
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
