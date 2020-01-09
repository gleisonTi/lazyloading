import { Injectable, Injector } from '@angular/core';
import { CondicaoPagamento } from './condicao-pagamento.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';

@Injectable({
  providedIn: 'root'
})

export class CondicaoPagamentoService extends BaseRecursoService<CondicaoPagamento> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/condicoesPagamento`, `${INCCA_WEB_URL}/basico/condicaoPagamento`,
      injector,
      CondicaoPagamento.fromJson);
  }

}
