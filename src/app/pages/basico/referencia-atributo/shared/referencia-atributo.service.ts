import { Injectable, Injector } from '@angular/core';
import { ReferenciaAtributo } from './referencia-atributo.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaAtributoService extends BaseRecursoService<ReferenciaAtributo> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ReferenciaAtributos`, `${INCCA_WEB_URL}/basico/ReferenciaAtributo`,
      injector,
      ReferenciaAtributo.fromJson);
  }

  public getAll(state: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ReferenciaId=${queryId}&${query}`,  ).pipe(
      tap(()=> this.loading = false),
      catchError(this.handleError)
    );
  }

  public save(data: ReferenciaAtributo, isNew?: boolean) {
    if (isNew) {
      return this.create(data);
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash
        data.id = res.id
        this.update(data).subscribe(() => {});
      })
      );
    }
  }

  public remove(data: any) {
    return this.delete(data.id)
  }



}
