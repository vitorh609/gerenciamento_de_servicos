import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Colaborador} from "../colaborador/colaborador";
import {Observable} from "rxjs";
import { enviroment } from 'src/enviroments/enviroment';
import {ConsoleLogger} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  apiUrl: string = enviroment.apiUrl + '/api/colaborador'

  constructor(private httpClient: HttpClient,
              ) { }

  create(colaborador: Colaborador): Observable<Colaborador>{
    return this.httpClient.post<Colaborador>(`${this.apiUrl}`, colaborador);
  }

  list(): Observable<Colaborador[]>{
    return this.httpClient.get<Colaborador[]>(`${this.apiUrl}`)
  }

  update(colaborador: Colaborador): Observable<Colaborador>{
    return this.httpClient.put<Colaborador>(`${this.apiUrl}/${colaborador.collaboratorId}`, colaborador)
  }

  getById(idColaborador: number): Observable<Colaborador>{
    return this.httpClient.get<Colaborador>(`${this.apiUrl}/${idColaborador}`)
  }
}
