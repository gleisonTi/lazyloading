import { Message, Messages } from './../../../../shared/models/message.model';
import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Grupo } from './grupo.model';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap, map } from 'rxjs/operators';
import { Atributo } from '../../atributo/shared/atributo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends BaseRecursoService<Grupo> {


  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/grupos`, `${INCCA_WEB_URL}/basico/grupo`,
      injector,
      Grupo.fromJson);
  }

  getAll(state?: State, queryId?: any): Observable<GridDataResult> {
    // console.log("base " + queryId + state.sort.toString);
    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?GrupoIdPai=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public save(data: Grupo, isNew?: boolean): Observable<Grupo> {
    if (isNew) {
      return this.create(data).pipe(tap(() => this.read(this.state, this.queryId)))
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe((res) => {
          this.read(this.state, this.queryId)
        })
      })
      )
    }
  }

  public removeGrupoAtributosVariacoes(GrupoId: string): Observable<Messages> {
    const body = { GrupoId };
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/removeGrupoAtributosVariacoes`, JSON.stringify(body));
  }

  public getNewGrupoCodigo(): Observable<{ Codigo: number}> {
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/GetNewGrupoCodigo`, JSON.stringify({})).pipe(map(res => res));
  }

  public getAtributosbyGrupoId(GrupoId:string): Observable<{ Atributos: Array<Atributo>}> {
    const body = { GrupoId };
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/getAtributosbyGrupoId`, JSON.stringify(body));
  }


  public checkCodProduto(Table: string, atribute: string): Observable<{ contains: boolean, message: string }> {
    let body = { Table, atribute }
    return this.http.post<any>(`${INCCA_WEB_URL}/Utils/SearchUkAtribute`, JSON.stringify(body))
      .pipe(map(res => res.response));
  }

}
