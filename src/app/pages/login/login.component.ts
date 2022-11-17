import { Users } from './../../models/users';
import { ApiUsersService } from './../../services/api-users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  mensagem: string = '';
  acesso: string = ''

  formUsers: Users

  constructor(
    private _router: Router,
    private _apiUsersService : ApiUsersService
  ) {
    this.formUsers = new Users
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('usuario')){
      this._router.navigate(['/home'])
    }
  }

  login () {
    if(this.formUsers.email === '' || this.formUsers.senha === '') {
      this.isLogged = true
      this.mensagem = 'Campos em branco*'
      setTimeout(() => {
        this. isLogged = false
        this.mensagem = ''
      }, 3000);
    } else {
      this.testeLogin ()
    }
  }

  testeLogin () {
    this._apiUsersService.getAllUsers()
    .subscribe((dados: any) => {
     dados.forEach((element:any) => {
      if(element.email === this.formUsers.email && element.senha === this.formUsers.senha) {
        window.localStorage.setItem('usuariossssssss', this.formUsers.senha)
        window.localStorage.setItem('acesso', element.acesso)
        this._router.navigate(['/home'])
      }
     });
     this.mensagem = 'Usuário inválido';
     this.isLogged = true
     setTimeout ( () =>{
      this.isLogged = false
      this.mensagem = ''
      this.formUsers.email = ''
      this.formUsers.senha = ''
     },3000)
    })
  }

}
