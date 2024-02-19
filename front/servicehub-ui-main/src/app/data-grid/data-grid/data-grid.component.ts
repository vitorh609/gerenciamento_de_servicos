import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridConfig} from "./gridConfig";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit{
  @Input() header: GridConfig[] = [];
  @Input() listaObjetos: any[] = [];
  @Input() btnAcoesPosicao: string = 'end';

  @Output() editarRegistro = new EventEmitter<any>();
  @Output() excluirRegistro = new EventEmitter<any>();
  ngOnInit(): void {
    console.log(this.listaObjetos)
  }

  getValueObject(obj: any, prop: string){
    const propriedadeArray = prop.split('.');
    let value = obj
    for (const propriedade of propriedadeArray){
      value = value[propriedade];
    }
    console.log()
    return value;
  }

  getObjetoEdit(objeto: any){
    this.editarRegistro.emit(objeto);
  }

  getObjetoDelete(objeto: any){
    this.excluirRegistro.emit(objeto)
  }

}
