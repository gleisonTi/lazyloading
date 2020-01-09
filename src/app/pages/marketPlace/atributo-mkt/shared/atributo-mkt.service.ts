import { Injectable, Injector } from '@angular/core';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { AtributoMkt } from './atributo-mkt.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';
import { Atributo } from 'src/app/pages/basico/atributo/shared/atributo.model';

@Injectable({
  providedIn: 'root'
})

export class AtributoMktService extends BaseRecursoService<AtributoMkt> {

  public currentMarketPlaceNome: string

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/marketplace/AtributosMkp?`, `${INCCA_WEB_URL}/marketplace/AtributoMkt`,
      injector,
      AtributoMkt.fromJson);
  }

  public setValorMarketPlace(nomeMarketPlace: string){
    this.currentMarketPlaceNome = nomeMarketPlace
  }

  getAll(state?: State, queryId?: any): Observable<GridDataResult> {
    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}MktPlaceId=${this.currentMarketPlaceNome}&AtributoIdPai=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

}