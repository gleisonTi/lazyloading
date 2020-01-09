import { ReferenciaMkt } from './referencia-mkt.model';
import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Referencia } from 'src/app/pages/basico/referencia/shared/referencia.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaMktService extends BaseRecursoService<ReferenciaMkt> {

  public loading: boolean = false
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/marketplace/referenciasmkt`, `${INCCA_WEB_URL}/marketplace/referenciamkt`,
      injector,
      ReferenciaMkt.fromJson);
  }

  public save(referencia: ReferenciaMkt, isNew?: boolean): Observable<ReferenciaMkt> {
    if (isNew) {
      return this.create(referencia).pipe(tap(() => this.read(this.state, this.queryId)))
    } else {
      return this.getById(referencia.id).pipe(tap(res => {
        referencia.gx_md5_hash = res.gx_md5_hash;
        referencia.ReferenciaMktId = res.ReferenciaMktId
        this.update(referencia).subscribe((res) => {
          this.read(this.state, this.queryId)
        })
      })
      )
    }
  }

}