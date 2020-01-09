import { Injectable, Injector } from '@angular/core';
import { ClienteContato } from './cliente-contato.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { ClienteEndereco } from '../../cliente-endereco/shared/cliente-endereco.model';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteContatoService extends BaseRecursoService<ClienteContato> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ClienteContatos`, `${INCCA_WEB_URL}/basico/ClienteContato`,
      injector,
      ClienteEndereco.fromJson);
  }

  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ClienteId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

}