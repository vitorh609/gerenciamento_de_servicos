import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


import {Cliente} from "../cliente";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit{

  clientes: Cliente[] = [];
  cliente: Cliente;

  showMessage: string = '';

  errors: string[] = [];
  id: any

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute){
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.buscaCliente()
  }

  buscaCliente(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (id && id != 0){
      this.clienteService.getClienteById(id).subscribe(
        clienteFind => {
          this.id = clienteFind.id;
          this.cliente = clienteFind;
        },
      )
    }
  }

  onSubmit(){
    if (this.id){

      this.clienteService.updateCliente(this.cliente).subscribe(
        response => {
          this.showMessage = 'Cliente atualizado com sucesso!';
          this.errors = [];
        }, error => {
          this.errors = ['Erro ao atualizar cliente']
        }
      )

    }else {
      this.clienteService.createCliente(this.cliente).subscribe(reponse => {
          this.showMessage = 'Cliente criado com sucesso';
          this.errors = [];
          this.cliente = reponse;
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        }
      )
    }

  }

  voltar(){
    this.router.navigate(['/clientes/list'])
  }

}
