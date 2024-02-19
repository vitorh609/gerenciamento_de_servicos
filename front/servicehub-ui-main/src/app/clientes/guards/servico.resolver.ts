import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ServicoPrestadoService} from "../../service/servico-prestado.service";
import {ServicoPrestado} from "../../servico-prestado/servicoPrestado";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicoResolver implements Resolve<ServicoPrestado>{
  constructor(private servicoPrestadoService : ServicoPrestadoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServicoPrestado> {
    if (route.params && route.params['id']){
      return this.servicoPrestadoService.searchById( route.params['id'])
    }
    return of({id: '1', descricao: '', preco: '', data: '', idCliente: 0});
  }

}
