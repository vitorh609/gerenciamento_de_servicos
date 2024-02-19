import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {enviroment} from "../../../enviroments/enviroment";
import {Observable} from "rxjs";
import {Page} from "../../page/Page";
import {TipoDespesa} from "../tipoDespesa";
import {Despesa} from "../despesa";
import {Cliente} from "../../clientes/cliente";
import {DespesaBusca} from "../despesaBusca";

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  apiUrl: string = enviroment.apiUrl + '/api/despesa'
  apiUrlTipoDespesa: string = enviroment.apiUrl + '/api/tipodespesa'

  constructor(private httpClient: HttpClient) {
  }

  save(despesa: Despesa): Observable<Despesa>{
    return this.httpClient.post<Despesa>(this.apiUrl, despesa);
  }

  getDespesaPage(page: number, size: number): Observable<Page<DespesaBusca>>{
    const params = new HttpParams().set('page', page).set('size', size)
    return this.httpClient.get<Page<DespesaBusca>>(`${this.apiUrl}?${params.toString()}`)

  }

  getTipoDespesa(): Observable<TipoDespesa[]>{
    return this.httpClient.get<TipoDespesa[]>(this.apiUrlTipoDespesa);
  }

}
