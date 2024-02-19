import {Component, OnInit} from '@angular/core';
import {Colaborador} from "../colaborador";
import {Router} from "@angular/router";
import {ColaboradorService} from "../../service/colaborador.service";

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit{
  colaboradores: Colaborador[] = [];
  constructor(private route: Router,
              private colaboradorService: ColaboradorService) {
  }
  ngOnInit(): void {
    this.search();
  }
  novoCadastro(){
    this.route.navigate(['/colaborador/form'])
  }

  onEdit(colaboradorId: number){
    this.route.navigate(['/colaborador/edit/'+ colaboradorId])
  }


  search(){
    this.colaboradorService.list()
      .subscribe( colaborattorFind => {
        this.colaboradores = colaborattorFind;
        console.log(colaborattorFind)
      })
  }


}
