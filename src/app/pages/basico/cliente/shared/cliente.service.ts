import { ClienteEnderecoService } from './../../cliente-endereco/shared/cliente-endereco.service';
import { Injectable, Injector } from '@angular/core';
import { Cliente } from './cliente.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClienteFull } from './clienteFull.model';
import { ClienteEndereco } from '../../cliente-endereco/shared/cliente-endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseRecursoService<Cliente> {

  // subject criado para armazenar o Cliente Endereço do cliente se o cadastro for novo
  private dataSource = new BehaviorSubject<Array<ClienteEndereco>>([]);
  public data = this.dataSource.asObservable();
  public clienteEnderecoService: ClienteEnderecoService;
  public clienteEnderecoList: Array<ClienteEndereco> = [];

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/clientes`, `${INCCA_WEB_URL}/basico/cliente`,
      injector,
      Cliente.fromJson);
    this.clienteEnderecoService = this.injector.get(ClienteEnderecoService);
  }

  public setClienteEndereco(clienteEndereco: ClienteEndereco) {
    this.clienteEnderecoList.push(clienteEndereco);
    this.dataSource.next(this.clienteEnderecoList);
  }

  public removeClienteEndereco(index){
    this.clienteEnderecoList.splice(index, 1);
    this.dataSource.next(this.clienteEnderecoList);

  }
  public clearClienteEndereco() {
    this.clienteEnderecoList = [];
    this.dataSource.next([]);
  }

  public save(data: Cliente, isNew?: boolean): Observable<Cliente> {
    if (isNew) {
      return this.create(data).pipe(tap((res) => {
        const cliente: Cliente = res;
        this.dataSource.subscribe(res => {
          if (res.length) {
            res.forEach(item => {
              let clienteEndereco: ClienteEndereco = item;
              clienteEndereco.ClienteId = cliente.ClienteId;
              this.clienteEnderecoService.save(clienteEndereco, isNew).subscribe(() => {});
            });
            this.clienteEnderecoList = [];
           // this.clearClienteEndereco(); // seta vazio no array de endereços
          }
        });
        this.read(this.state, this.queryId);
      }));
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe((res) => {
          this.read(this.state, this.queryId);
        })
      })
      )
    }
  }

  public checkCodProduto(Table: string, atribute: string): Observable<{ contains: boolean, message: string }> {
    const body = { Table, atribute }
    return this.http.post<any>(`${INCCA_WEB_URL}/Utils/SearchUkAtribute`, JSON.stringify(body)).pipe(map(res => res.response))
  }

  public getNewCodigoCliente(): Observable<{ Codigo: number }> {
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/GetNewCodigoCliente`, JSON.stringify({})).pipe(map(res => res));
  }

  // busca dados completos do cliente como Enderecos, Representante, Contato
  public getClienteFull(id: string): Observable<ClienteFull> {
    return this.http.get<ClienteFull>(`${INCCA_WEB_URL}/basico/ClienteFullDataDP?ClienteId=${id}`);
  }
}
