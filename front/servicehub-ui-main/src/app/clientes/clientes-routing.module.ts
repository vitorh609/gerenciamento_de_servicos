import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ClientesFormComponent} from "./clientes-form/clientes-form.component";
import {ClientesListComponent} from "./clientes-list/clientes-list.component";
import {ClienteResolver} from "./guards/cliente.resolver";
import {LayoutComponent} from "../layout/layout.component";

const routes: Routes = [
  { path: 'clientes', component: LayoutComponent, children: [
      { path: 'form', component: ClientesFormComponent },
      { path: 'edit/:id', component: ClientesFormComponent},
      { path: 'list', component: ClientesListComponent },
      { path: '', redirectTo: '/clientes/list', pathMatch: 'full'}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
