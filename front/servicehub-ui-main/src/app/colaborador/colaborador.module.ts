import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorFormComponent } from './colaborador-form/colaborador-form.component';
import {FormsModule} from "@angular/forms";
import { ColaboradorListComponent } from './colaborador-list/colaborador-list.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ColaboradorFormComponent,
    ColaboradorListComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class ColaboradorModule { }
