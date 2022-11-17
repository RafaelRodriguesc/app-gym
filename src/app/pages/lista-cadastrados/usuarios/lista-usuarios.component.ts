import { HttpClient } from '@angular/common/http';
import { ApiUsersService } from './../../../services/api-users.service';
import { Users } from './../../../models/users';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  Users: any [] = []
  formUser : Users
  cepNaoEncontrado: boolean = false
  selecionado: any;
  usuarioSelecionado: any;

  id: number = 0;
  nome: string = ''
  email: string = ''
  celular: string = ''
  residencial: string = ''
  acesso: string = ''
  logradouro: string = ''
  bairro: string = ''
  cidade: string = ''
  estado: string = ''
  cep: string = ''
  senha: string = ''


  constructor(
    private _router: Router,
    private _apiUsersService: ApiUsersService,
    private _http: HttpClient
  ) {
    this.formUser = new Users
  }

  ngOnInit(): void {
    this.buscaUsuario()
  }

  goSelecionado(id: any) {
    this.selecionado = id
  }

  buscaUsuario () {
    this._apiUsersService.getAllUsers().subscribe(data => {
      this.Users = data
    })
  }

  getDadosCep () {
    if(this.formUser.endereco.cep === '') {
      this.limpadados()
      return
    }
    this._http.get("https://viacep.com.br/ws/"+this.formUser.endereco.cep+"/json/").subscribe(( dataCep: any) => {
      if(dataCep.erro){
        this.cepNaoEncontrado = true
        this.limpadados()
        setTimeout(() => {
          this.cepNaoEncontrado = false
        }, 3000)
        return
      }

      this.formUser.endereco.logradouro = dataCep ['logradouro']
      this.formUser.endereco.bairro = dataCep ['bairro']
      this.formUser.endereco.cidade = dataCep ['localidade']
      this.formUser.endereco.estado = dataCep ['uf']
    })
  }

  limpadados() {
    this.formUser.endereco.cep = ''
    this.formUser.endereco.logradouro = ''
    this.formUser.endereco.bairro = ''
    this.formUser.endereco.cidade = ''
    this.formUser.endereco.estado = ''
    return
  }

  goCadastro () {
    this._apiUsersService.postUser(this.formUser).subscribe(data =>{ })
    this.getAllUsers()

  }

  goDelete (id:number) {
    console.log("id", id)
    const params = {
      id: id,
      tabela: 'usuarios'
    }
    this._apiUsersService.deleteitem(params).subscribe(data => {
      this.getAllUsers()
    })
 }

  getAllUsers () {
    this._apiUsersService.getAllUsers().subscribe( data => {
      this.Users = data
    })
  }

  userView (dados: any) {
    this.id = dados.id
    this.nome = dados.nome
    this.email = dados.email
    this.celular = dados.contato.celular
    this.residencial = dados.contato.residencial
    this.acesso = dados.acesso
    this.logradouro = dados.endereco.logradouro
    this.bairro = dados.endereco.bairro
    this.cidade = dados.endereco.cidade
    this.estado = dados.endereco.estado
    this.cep = dados.endereco.cep
    this.senha = dados.senha
  }


  goAltera() {
    let dadosUser = {
      "id": this.id,
      "nome": this.nome,
      "email": this.email,
      "acesso": this.acesso,
      "senha": this.senha,
      "contato": {
        "celular": this.celular,
        "residencial": this.residencial,
      },
      "endereco": {
        "logradouro": this.logradouro,
        "bairro": this.bairro,
        "cidade": this.cidade,
        "estado": this.estado,
        "cep": this.cep,
      },
    }
    this._apiUsersService.putUser(dadosUser).subscribe(data => {
      this.getAllUsers()
      this._router.navigate(['/lista-usuarios'])
    })
  }

  search(e: any): void {
    const target = e.target.value || null
    if(!target){
      this.getAllUsers();
      return
    }
    // const value = target.value
    const filtered = this.Users.filter(s => s.nome.toLowerCase().includes(target.toLowerCase()))
    if(filtered.length > 0) {
      this.Users = filtered
    } else {
      this.getAllUsers()
    }

  }
}
