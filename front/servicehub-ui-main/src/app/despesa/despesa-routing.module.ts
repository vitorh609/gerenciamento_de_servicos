import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LayoutComponent} from "../layout/layout.component";
import {DespesaComponent} from "./despesa-form/despesa.component";
import {DespesaListComponent} from "./despesa-list/despesa-list.component";

const routes: Routes = [
  { path: 'despesa', component: LayoutComponent, children: [
      { path: 'form', component: DespesaComponent },
      // { path: 'edit/:id', component: ClientesFormComponent},
      { path: 'list', component: DespesaListComponent },
      { path: '', redirectTo: '/despesa/list', pathMatch: 'full'}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesaRoutingModule { }
