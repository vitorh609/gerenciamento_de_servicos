import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";
import {Observable} from "rxjs";
import {Login} from "../login/login";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  apiUrl: String = enviroment.apiUrl + '/api/user';
  constructor(private httpClient: HttpClient) {

  }
  validatorLogin(username: string, password: string):Observable<Login>{
    const httpParms: HttpParams = new HttpParams()
      .set("username", username).set("password", password);
    const url: string = this.apiUrl + '/authorization' + '?' + httpParms.toString();

    console.log(url)

    return this.httpClient.get<Login>(url);
  }

  createUser(login: Login): Observable<String>{
    return this.httpClient.post<String>(`${this.apiUrl}`, login)
  }
}
