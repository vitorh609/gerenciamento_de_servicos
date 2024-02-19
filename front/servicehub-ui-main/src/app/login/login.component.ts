import { Component } from '@angular/core';
import {Route, Router} from "@angular/router";
import {ValidatorService} from "../service/validator.service";
import {Login} from "./login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  passward: string = '';

  cadastrando: boolean = false;
  message: string = '';
  messageError: string = '';
  errors: string[] = [];
  login: Login;
  created: boolean = false;
  constructor(private route: Router,
              private validator: ValidatorService) {
    this.login = new Login();
  }

  onSubmit(){
    if (this.cadastrando == true){
      this.validator.createUser(this.login).subscribe( reponse => {
        this.created = true
        this.message = 'Usuário cadastrado'
        this.messageError = ''
        this.cadastrando = false
        console.log(reponse)
      })
      console.log("Cadastrar usuário")
    }else {
      this.validator.validatorLogin(this.login.username, this.login.password).subscribe(response => {
          this.login = response
          if (response !== null){
            this.errors = []
            this.route.navigate([ '/home'])
          }
        }, errorResponse => {
          this.messageError = errorResponse.error.message
          console.log(this.message)
        }
      )
    }

    console.log(`User: ${this.username} Password: ${this.passward}`)
  }

  prepararCadastro(event: any){
    event.preventDefault();
    this.cadastrando = true
    this.messageError = ''
    this.login = new Login();
  }

  cancelarCadastro(){
    this.cadastrando = false
  }
}
