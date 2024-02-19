import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges{

  @Input() totalPaginas: number = 0
  @Output() page = new EventEmitter();

  paginasIndices: number[] = [];
  indiceSelecionado: number = 0 - 1

  ngOnInit(): void {
    this.indiceSelecionado = 0
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('totalPaginas' in changes) {
      this.adicionarIndices(this.totalPaginas)
    }
  }

  adicionarIndices(totalPages: number): void {
    this.paginasIndices = Array.from({ length: totalPages }, (_, index) => index);
  }

  carregarPagina(pagina: any, tamanho: number = 2){
    this.page.emit(pagina)
    this.indiceSelecionado = pagina
  }

  carregarPaginaAnterior(){
    let pagina = this.indiceSelecionado - 1
    if (pagina < 0){
      this.page.emit(0)
      this.indiceSelecionado = pagina + 1;
    }else {
      this.page.emit(pagina)
      this.indiceSelecionado = pagina;
    }
  }

  carregarProximaPagina(){
    let totalIndices = this.paginasIndices.length;
    console.log(totalIndices)
    let pagina = this.indiceSelecionado + 1;
    console.log(pagina)
    if(pagina >= totalIndices){
      this.page.emit(pagina -1)
    }else {
      this.page.emit(pagina)
      this.indiceSelecionado = pagina;
    }
  }

}
