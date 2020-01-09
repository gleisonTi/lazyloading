import { Injectable, Injector } from '@angular/core';
import { Referencia } from './referencia.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService extends BaseRecursoService<Referencia> {
  public state: State;
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/referencias`, `${INCCA_WEB_URL}/basico/referencia`,
      injector,
      Referencia.fromJson);
  }

  public save(data: Referencia, isNew?: boolean): Observable<Referencia> {
    if (isNew) {
      return this.create(data).pipe(tap(() => this.read(this.state, this.queryId)));
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe(() => {
          this.read(this.state, this.queryId);
        });
      })
      );
    }
  }

  public checkCodProduto(Table: string, atribute: string): Observable<{ contains: boolean, message: string }> {
    const body = { Table, atribute };
    return this.http.post<any>(`${INCCA_WEB_URL}/Utils/SearchUkAtribute`, JSON.stringify(body),  ).pipe(map(res => res.response));
  }

}
