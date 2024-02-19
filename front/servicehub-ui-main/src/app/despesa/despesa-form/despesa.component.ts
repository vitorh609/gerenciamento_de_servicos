import {Component, OnInit} from '@angular/core';
import {Despesa} from "../despesa";
import {Colaborador} from "../../colaborador/colaborador";
import {TipoDespesa} from "../tipoDespesa";
import {Router} from "@angular/router";
import {ColaboradorService} from "../../service/colaborador.service";
import {DespesaService} from "../service/despesa.service";
import {GridConfig} from "../../data-grid/data-grid/gridConfig";
import {DespesaBusca} from "../despesaBusca";

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit{
  dataConfig = new Array<GridConfig>()
  despesa: Despesa = new Despesa();
  despesasBusca: DespesaBusca[] = []
  colaboradores: Colaborador[] = [];
  tipoDespesas: TipoDespesa[] = [];
  pagina = 0
  tamanho = 2
  totalPaginas = 0
  errors: string[] = [];
  showMessage: string = '';

  constructor(private route: Router,
              private colaboradorService: ColaboradorService,
              private despesaService: DespesaService
  ) {
  }

  ngOnInit(): void {
    this.getColaborattor();
    this.getTipoDespesas();
    this.getDespesa(this.pagina, this.tamanho)
    console.log(this.despesasBusca )
    this.setColunasDespesa()
  }

  private setColunasDespesa() {
    this.dataConfig.push(
      new GridConfig(
        'Id',
        'id'
      ),
      new GridConfig(
        'Despesa',
        'tipoDespesa.tipoDespesa'
      ),
      new GridConfig(
        'Colaborador',
        'colaborador.collaborator'
      ),
      new GridConfig(
        'Data cadastro',
        'data'
      ),
      new GridConfig(
        'Valor',
        'valor'
      )
    );
  }
  getColaborattor(){
    this.colaboradorService.list().subscribe(
      register => {
        this.colaboradores = register;
      }
    )
  }

  getTipoDespesas(){
    this.despesaService.getTipoDespesa().subscribe(
      register => {
        this.tipoDespesas = register;
        console.log(register)
      }, error => {
        this.errors = error.error.error
      }
    )
  }

  getDespesa(page = 0, size = 5){
    this.despesaService.getDespesaPage(page, size).subscribe(
      register => {
        this.despesasBusca = register.content;
        this.totalPaginas = register.totalPages;
        console.log(register)
      }
    )
  }


  onSubmit(){
    this.despesaService.save(this.despesa).subscribe(
      register => {
        this.despesa = register;
        this.showMessage = 'Despesa cadastrada'
        this.errors = []
        this.getDespesa(this.pagina, this.tamanho)
      }, error => {
        this.errors = error.error.errors
      }
    )
  }
  goToPage(pagina: number, tamanho: number = 2){
    this.despesaService.getDespesaPage(pagina, tamanho).subscribe(
      register => {
        this.despesasBusca = register.content;
        this.totalPaginas = register.totalPages;
      }
    )
  }
  voltar(){
    this.route.navigate(['/despesa/list'])
  }

  protected readonly DespesaBusca = DespesaBusca;
}
