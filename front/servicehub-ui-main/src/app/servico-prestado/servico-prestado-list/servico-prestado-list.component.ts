import {Component, OnInit} from '@angular/core';
import {ServicoPrestadoBusca} from "./servicoPrestadoBusca";
import {ServicoPrestadoService} from "../../service/servico-prestado.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit{
  nome: string = '';
  mes: number = 0;
  meses: number[] = [];
  message: string = ''
  quant: number = 0

  servicoPrestadoBuscar: ServicoPrestadoBusca[] = []

  constructor(private servicoPrestadoService: ServicoPrestadoService,
              private route: Router) {
    this.meses = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
    this.buscarTodos();
  }

  buscarTodos(){
    this.servicoPrestadoService.searchAll()
      .subscribe(
        response => this.servicoPrestadoBuscar = response)
  }
  consultar(){
    this.servicoPrestadoService.searchServicoPrestado(this.nome, this.mes)
      .subscribe(response => {
        this.servicoPrestadoBuscar = response
        this.quant = 0
        if(this.servicoPrestadoBuscar.length <= 0){
          this.message = 'Nenhum registro encontrado'
        }else {
          this.quant = this.servicoPrestadoBuscar.length
          this.message = `registros encontrados`
          console.log(this.quant)
        }
        }
      )
    console.log(this.mes, this.nome)
  }

  onEdit(id: string){
    this.route.navigate(['/servico-prestado/edit/'+id])
  }

  novoCadastro(){
    this.route.navigate(['/servico-prestado/form'])
  }
}
