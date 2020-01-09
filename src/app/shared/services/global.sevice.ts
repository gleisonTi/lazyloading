import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { INCCA_WEB_URL } from './api.inccaWeb';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// classe com  services globais como seguimento
export class GlobalService {

  public state
  constructor(private httpClient: HttpClient, ) { }

  public getSeguimentos(): Observable<Array<{ Seguimento: string, SeguimentoDescricao: string }>> {

    return this.httpClient
      .get<Array<{ Seguimento: string, SeguimentoDescricao: string }>>(`${INCCA_WEB_URL}/basico/Seguimentos`)
  }

  public getCnpjData(cnpj: string): Observable<any> {

    const cnpjBody = cnpj.replace(/[\/.-]/g, "")
    console.log(cnpjBody);
    return this.httpClient
      .get<any>(`https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${cnpjBody}`);

  }
  public getAddresData(cep: string): Observable<any> {

    const cepBody = cep.replace(/[\/.-]/g, "")
    console.log(cepBody);
    return this.httpClient
      .get<any>(`https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${cepBody}/json/`);
  }
}
