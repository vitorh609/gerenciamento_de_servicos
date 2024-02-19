import {TipoDespesa} from "./tipoDespesa";
import {Colaborador} from "../colaborador/colaborador";

export class DespesaBusca{
  "id": number;
  "tipoDespesa": TipoDespesa;
  "colaborador": Colaborador;
  "descricao": string;
  "data": string;
  "valor": string;
}
