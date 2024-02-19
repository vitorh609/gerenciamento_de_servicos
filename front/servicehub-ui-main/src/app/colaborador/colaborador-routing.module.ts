import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "../layout/layout.component";
import {ColaboradorFormComponent} from "./colaborador-form/colaborador-form.component";
import {ColaboradorListComponent} from "./colaborador-list/colaborador-list.component";

const routes: Routes = [
  { path: 'colaborador', component: LayoutComponent, children: [
      { path: 'form', component: ColaboradorFormComponent },
      { path: 'list', component: ColaboradorListComponent },
      { path: 'edit/:id', component: ColaboradorFormComponent}
      // { path: '', redirectTo: 'servico-prestado/list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
