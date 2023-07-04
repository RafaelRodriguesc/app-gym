import { Clients } from './../../../models/clients';
import { HttpClient } from '@angular/common/http';
import { ApiClientesService } from './../../../services/api-clientes.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  cepNaoEncontrado: boolean = false
  modalError: boolean = false
  formClient: Clients
  planos: any[] = []
  plano: string = ''
  valorPlano: string = ''
  modalidades: any[] = []
  turnos: any[] = []
  nome: string = ''
  displayStyle: string = 'none'
  constructor(
    private _router: Router,
    private _apiClientesService: ApiClientesService,
    private _http: HttpClient

  ) {
    this.formClient = new Clients
  }

  ngOnInit(): void {
    this.getPlanos()
    this.getTurnos()
    this.getModalidades()
  }

  limpadados() {
    this.formClient.endereco.cep = ''
    this.formClient.endereco.logradouro = ''
    this.formClient.endereco.bairro = ''
    this.formClient.endereco.cidade = ''
    this.formClient.endereco.estado = ''
    return
  }

  getDadosCep() {
    if (this.formClient.endereco.cep === '') {
      this.limpadados()
      return
    }
    this._http.get("https://viacep.com.br/ws/" + this.formClient.endereco.cep + "/json/").subscribe((dataCep: any) => {
      if (dataCep.erro) {
        this.cepNaoEncontrado = true
        this.limpadados()
        setTimeout(() => {
          this.cepNaoEncontrado = false
        }, 3000)
        return
      }

      this.formClient.endereco.logradouro = dataCep['logradouro']
      this.formClient.endereco.bairro = dataCep['bairro']
      this.formClient.endereco.cidade = dataCep['localidade']
      this.formClient.endereco.estado = dataCep['uf']
    })
  }

  goCadastro() {
    if (this.formClient.nome === '' || this.formClient.idade === '' || this.formClient.email === '' || this.formClient.contato.celular === '' || this.formClient.contato.residencial === '' || this.formClient.endereco.cep === '') {
      this.displayStyle = 'block'
    }
    else {
      this._apiClientesService.postClient(this.formClient).subscribe(data => {
        this._router.navigate(['/lista-clientes'])
      })
    }

  }

  closePopup(){
    this.displayStyle = 'none'
  }

  getPlanos() {
    this._http.get('http://localhost:3000/planos').subscribe((responsePlanos: any) => {
      this.planos = responsePlanos
    })
  }

  getModalidades() {
    this._http.get('http://localhost:3000/modalidades').subscribe((responseModalidades: any) => {
      this.modalidades = responseModalidades
    })
  }

  getTurnos() {
    this._http.get('http://localhost:3000/turnos').subscribe((responseTurnos: any) => {
      this.turnos = responseTurnos
    })
  }


  getValorPlano(e: any) {
    if (this.formClient.plano.nome === '' || this.formClient.plano.nome === null) {
      return
    } else {
      this.planos.forEach(element => {
        if (element.nome === this.formClient.plano.nome) {
          this.valorPlano = element.valor
          this.formClient.plano.valor = element.valor
        }
      })
    }
  }

  getValorModalidade(e: any) {
    if (this.nome === '' || this.nome === null) {
      return
    } else {
      this.modalidades.forEach(element => {

      })
    }

  }

  goClean() {
    this.formClient.contato.celular = ''
    this.formClient.nome = ''
    this.formClient.idade = ''
    this.formClient.email = ''
    this.formClient.endereco.cep = ''
    this.formClient.endereco.logradouro = ''
    this.formClient.endereco.bairro = ''
    this.formClient.endereco.cidade = ''
    this.formClient.endereco.estado = ''

  }


}
