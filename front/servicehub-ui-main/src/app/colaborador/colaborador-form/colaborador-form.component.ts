import {Component, OnInit} from '@angular/core';
import {Colaborador} from "../colaborador";
import {ColaboradorService} from "../../service/colaborador.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css']
})
export class ColaboradorFormComponent implements OnInit{

  colaborador: Colaborador;
  showMessage: string = ''
  errors: string[] = [];
  id : number = 0
  constructor(private colaboradorService: ColaboradorService,
              private route: Router,
              private activadedRoute: ActivatedRoute) {
    this.colaborador = new Colaborador();
  }

  ngOnInit(): void {
    this.getColaborador()
  }

  onSubmit(){
    if (this.id){
      this.colaboradorService.update(this.colaborador).subscribe(
        colaborattorFind => {
          this.colaborador = colaborattorFind;
          this.showMessage = 'Cliente atualizado'
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        }
      )
    }else {
      this.colaboradorService.create(this.colaborador).subscribe(
        colaborattorFind => {
          console.log(colaborattorFind);
          this.colaborador = colaborattorFind;
          this.showMessage = 'Colaborador cadastrado';
          this.errors = [];
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          this.showMessage = '';
        }
      )
    }
  }

  getColaborador(){
    const id: number = Number(this.activadedRoute.snapshot.paramMap.get('id'));
    if (id && id != 0){
      console.log(id)
      this.colaboradorService.getById(id).subscribe(
        colaborattorFind => {
          this.colaborador = colaborattorFind;
          console.log(this.colaborador)
          this.id = colaborattorFind.collaboratorId;
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
        }
      )
    }
  }

  voltar(){
    this.route.navigate(['/colaborador/list'])
  }
}
