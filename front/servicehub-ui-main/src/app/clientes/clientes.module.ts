import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import {DataGridModule} from "../data-grid/data-grid.module";
import {PageModule} from "../page/page.module";


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListComponent
  ],
    imports: [
        CommonModule,
        ClientesRoutingModule,
        RouterModule,
        FormsModule,
        DataGridModule,
        PageModule
    ],
  exports: [
    ClientesFormComponent,
    ClientesListComponent
  ]
})
export class ClientesModule { }
