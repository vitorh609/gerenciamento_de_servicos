import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Cliente} from "../clientes/cliente";
import {Observable} from "rxjs";
import { enviroment } from 'src/enviroments/enviroment';
import {Page} from "../page/Page";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl: String = enviroment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>( `${this.apiUrl}/api/cliente`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/cliente/${cliente.id}`, cliente);
  }

  getClientePage(page: number, size: number): Observable<Page<Cliente>>{
    let cliente = new Cliente();
    cliente.id = 0
    cliente.nome = 'Vitor'
    cliente.dataCadastro = '01/03/2023'
    cliente.cpf = '08147483333'

    const params = new HttpParams().set('page', page).set('size', size)
    return this.httpClient.get<Page<Cliente>>(`${this.apiUrl}/api/cliente?${params.toString()}`);
  }

  getCliente(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.apiUrl}/api/cliente`)
  }


  getClienteById(id: number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.apiUrl}/api/cliente/${id}`);
  }

  deleteClienteService(cliente: Cliente): Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/api/cliente/${cliente.id}`);
  }
}
