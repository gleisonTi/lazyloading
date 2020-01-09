import { Injectable, Injector } from '@angular/core';
import { ClienteEndereco } from './cliente-endereco.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteEnderecoService extends BaseRecursoService<ClienteEndereco> {

  public state: State;
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ClienteEnderecos`, `${INCCA_WEB_URL}/basico/ClienteEndereco`,
      injector,
      ClienteEndereco.fromJson);
  }

  getAll(state: State, queryId?: any): Observable<GridDataResult> {

    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ClienteId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public save(data: ClienteEndereco, isNew?: boolean): Observable<ClienteEndereco> {

    if (isNew) {
      return this.create(data).pipe(tap(() => this.read(this.state, data.ClienteId)));
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe((res) => {
          this.read(this.state, data.ClienteId);
        });
      })
      );
    }
  }

}
