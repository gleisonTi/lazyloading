import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Setor } from './setor.model';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetorService extends BaseRecursoService<Setor> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/setores`, `${INCCA_WEB_URL}/basico/setor`,
      injector,
      Setor.fromJson);
  }


  public getNewSetorCodigo(): Observable<{ Codigo: number}> {

    return this.http.post<any>(`${INCCA_WEB_URL}/basico/GetNewSetorCodigo`, JSON.stringify({})).pipe(map(res => res));
  }


}
