import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

import {Cliente} from "../cliente";
import {ClienteService} from "../../service/cliente.service";
import {GridConfig} from "../../data-grid/data-grid/gridConfig";

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit{
  configuracaoTabela = new Array<GridConfig>();
  showActions: string = 'start';
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente
  showMessage: string = ''
  erro: string = ''
  pagina = 0
  tamanho = 2
  totalPaginas: number = 0
  constructor(private clienteService: ClienteService,
              private router: Router) {
    this.clienteSelecionado = new Cliente()
  }

  ngOnInit(): void {
    this.getClientes(this.pagina, this.tamanho)
    this.setColunasClientes()
  }

  private setColunasClientes() {
    this.configuracaoTabela.push(
      new GridConfig(
        'Id',
        'id'
      ),
      new GridConfig(
        'Cliente',
        'nome'
      ),
      new GridConfig(
        'CPF',
        'cpf'
      ),
      new GridConfig(
        'Data cadastro',
        'dataCadastro'
      )
    );
  }

  getClientes(pagina = 0, tamanho = 5){
    this.clienteService.getClientePage(pagina, tamanho).subscribe(
      registro =>{
        this.clientes = registro.content;
        this.totalPaginas = registro.totalPages;
      }
    );
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  onEdit(clienteId: number){
    this.router.navigate(['/clientes/edit/' + clienteId])
  }
  getObjetoEdit(cliente: Cliente){
    this.router.navigate(['/clientes/edit/' + cliente.id])
  }

  readingClienteForDelete(cliente: Cliente){
    this.clienteSelecionado = cliente
  }

  deleteClient(){
    this.clienteService.deleteClienteService(this.clienteSelecionado).subscribe(
      response => {
        this.showMessage = 'Cliente deleta com sucesso',
        this.getClientes()
    },erro => this.erro = 'Errro ao deletar cliente'
    )
  }

  goToPage(pagina: number, tamanho: number = 2){
    this.clienteService.getClientePage(pagina, tamanho).subscribe(
      registro =>{
        this.clientes = registro.content;
      }
    );
  }

}
