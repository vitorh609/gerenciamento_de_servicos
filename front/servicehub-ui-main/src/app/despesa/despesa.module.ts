import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaComponent } from './despesa-form/despesa.component';
import {DespesaRoutingModule} from "./despesa-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DataGridModule} from "../data-grid/data-grid.module";
import {PageModule} from "../page/page.module";
import { DespesaListComponent } from './despesa-list/despesa-list.component';

@NgModule({
  declarations: [
    DespesaComponent,
    DespesaListComponent
  ],
  imports: [
    CommonModule,
    DespesaRoutingModule,
    RouterModule,
    FormsModule,
    DataGridModule,
    PageModule
  ],
  exports: [
    DespesaComponent
  ]
})
export class DespesaModule { }
