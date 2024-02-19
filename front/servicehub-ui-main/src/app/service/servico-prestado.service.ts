import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ServicoPrestado} from "../servico-prestado/servicoPrestado";
import { enviroment } from "../../enviroments/enviroment";
import {ServicoPrestadoBusca} from "../servico-prestado/servico-prestado-list/servicoPrestadoBusca";

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService implements OnInit{

  apiUrl: string = enviroment.apiUrl + '/api/servico';

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    console.log(servicoPrestado.data)

    return this.httpClient.post<ServicoPrestado>(this.apiUrl, servicoPrestado);
  }

  updateServico(servico: ServicoPrestado): Observable<ServicoPrestado>{
    return this.httpClient.put<ServicoPrestado>(`${this.apiUrl}/${servico.id}`, servico)
  }

  searchServicoPrestado(nome: string, mes: number):Observable<ServicoPrestadoBusca[]>{
    console.log('Entrou no service')
    const httpParms = new HttpParams()
      .set("nome", nome).set("mes", mes);

    const url = this.apiUrl + "?" + httpParms.toString();
    console.log(url)

    return this.httpClient.get<ServicoPrestadoBusca[]>(url);
  }

  searchAll(): Observable<ServicoPrestadoBusca[]>{
    return this.httpClient.get<ServicoPrestadoBusca[]>(`${this.apiUrl}/all-services`);
  }

  searchById(id: number): Observable<ServicoPrestado>{
    return this.httpClient.get<ServicoPrestado>(`${this.apiUrl}/${id}`)
  }
}
