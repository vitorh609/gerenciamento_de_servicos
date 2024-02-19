import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../clientes/cliente";
import {ClienteService} from "../../service/cliente.service";
import {ServicoPrestado} from "../servicoPrestado";
import {ServicoPrestadoService} from "../../service/servico-prestado.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit{

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  cliente: Cliente ;

  showMessage: string = ''
  errors: string[] = []

  id: number = 0

  constructor(private clienteService: ClienteService,
              private servicoPrestadoService: ServicoPrestadoService,
              private route: Router,
              private activadedRoute: ActivatedRoute){
    this.servicoPrestado = new ServicoPrestado();
    this.cliente = new Cliente();
  }
  ngOnInit(): void {
    this.clienteService.getCliente()
      .subscribe(response => {
        this.clientes = response
      } );
    this.buscarservico();
  }

  onSubmit(){
    console.log(`Id do back${this.id}`)
    if (this.id){

      this.servicoPrestadoService.updateServico(this.servicoPrestado).subscribe(
        register => {
          this.showMessage = 'Serviço atualizado';
          this.errors = [];
          console.log(this.servicoPrestado)
        }, errorResponse => {
          this.errors = ['Erro ao atualizar servicos']
        }
      )

    }else {
      this.servicoPrestadoService.salvar(this.servicoPrestado).subscribe(
        register =>{
          this.servicoPrestado = register;
          this.showMessage = 'Servico prestado cadastrado';
          this.errors = [];
          this.servicoPrestado = new ServicoPrestado();
        },errorResponse => {
          this.errors = errorResponse.error.errors;
        }
      )
    }

    console.log(this.servicoPrestado)
  }

  voltar(){
    this.route.navigate(['/servico-prestado/list'])
  }

  buscarservico(){
    const id: number = Number(this.activadedRoute.snapshot.paramMap.get('id'))
    if (id && id != 0){
      this.servicoPrestadoService.searchById(id).subscribe(
        servicoFind => {
          this.servicoPrestado = servicoFind;
          this.id = servicoFind.id
          console.log(this.id)
          this.cliente.id = servicoFind.idCliente
          this.clienteService.getClienteById(this.cliente.id).subscribe(
            clienteFind => {
              this.cliente = clienteFind;
              console.log(clienteFind)
            }
          )
          console.log(servicoFind)
        }
      )
    }
  }
}
