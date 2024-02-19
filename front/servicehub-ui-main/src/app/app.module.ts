import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TemplateModule} from "./template/template.module";
import { HomeComponent } from './home/home.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {ClientesRoutingModule} from "./clientes/clientes-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ServicoPrestadoModule} from "./servico-prestado/servico-prestado.module";
import {FormsModule} from "@angular/forms";
import {ClientesModule} from "./clientes/clientes.module";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {ColaboradorModule} from "./colaborador/colaborador.module";
import {PageModule} from "./page/page.module";
import {DespesaModule} from "./despesa/despesa.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TemplateModule,
    RouterOutlet,
    AppRoutingModule,
    TemplateModule,
    ClientesRoutingModule,
    ServicoPrestadoModule,
    ColaboradorModule,
    PageModule,
    DespesaModule
  ],
  providers: [
    ClientesModule,
    ServicoPrestadoModule,
    ColaboradorModule,
    DespesaModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
