import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ClienteService} from "../../service/cliente.service";
import {Cliente} from "../cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<Cliente> {

  constructor(private clienteService: ClienteService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {
    if (route.params && route.params['id']){
      return this.clienteService.getClienteById( route.params['id'])
    }
    return of({id: 1, cpf: '', nome: '', dataCadastro: ''});
  }
}
