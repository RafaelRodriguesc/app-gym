import { HttpClient } from '@angular/common/http';
import { ApiClientesService } from './../../../services/api-clientes.service';
import { Router } from '@angular/router';
import { Clients } from './../../../models/clients';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  Clients: any [] = []
  selecionado: any
  planos: any [] = []
  modalidades: any [] = []
  turnos: any [] = []
  formClient : Clients
  valorPlano: string = ''

  id: number = 0;
  nome: string = ''
  email: string = ''
  celular: string = ''
  modalidade: string = ''
  logradouro: string = ''
  bairro: string = ''
  cidade: string = ''
  estado: string = ''
  cep: string = ''
  turno: string = ''
  plano: string = ''
  idade: string = ''
  valor: string = ''


  constructor(
    private _router: Router,
    private _apiClientService: ApiClientesService,
    private _http: HttpClient
  ) {
    this.formClient = new Clients
   }

  ngOnInit(): void {
    this.buscaClientes()
  }

  buscaClientes() {
    this._apiClientService.getAllClients().subscribe(data => {
      data.map((element:any) => {
        const dataHoje = moment(new Date());
        const dataInformada = moment(element.idade).format("YYYY-MM-DD");
        const newData: any = moment.duration(dataHoje.diff(dataInformada));
        element.idade = newData['_data']['years'];
      });
      this.Clients = data
    })
  }

  clienteSelecionado (id:any) {
    this.selecionado = id
  }

  viewCliente(dados: any) {
    this.id = dados.id
    this.nome = dados.nome
    this.email = dados.email
    this.celular = dados.contato.celular
    this.logradouro = dados.endereco.logradouro
    this.bairro = dados.endereco.bairro
    this.cidade = dados.endereco.cidade
    this.estado = dados.endereco.estado
    this.cep = dados.endereco.cep
    this.modalidade = dados.modalidade
    this.turno = dados.turno
    this.plano = dados.plano.nome
    this.idade = dados.idade
    this.valor = dados.plano.valor
  }

  goDelete (id:number) {
    const params = {
    id: id,
    tabela: 'clientes'
  }
  this._apiClientService.deleteitem(params).subscribe(data => {
    this.getAllClients()
  })
  }

  getAllClients () {
    this._apiClientService.getAllClients().subscribe( data => {
      this.Clients = data
    })
  }

  addCliente () {
    this._router.navigate(['/home'])
  }

  goAltera() {
    let dadosUser = {
      "id": this.id,
      "nome": this.nome,
      "idade": this.idade,
      "email": this.email,
      "contato": {
        "celular": this.celular,
      },
      "endereco": {
        "logradouro": this.logradouro,
        "bairro": this.bairro,
        "cidade": this.cidade,
        "estado": this.estado,
        "cep": this.cep,
      },
      "modalidade": this.modalidade,
      "plano": {
        "nome": this.nome,
        "valor": this.valor
      },
    }
    this._apiClientService.putCliente(dadosUser).subscribe(data => {
      this.getAllClients()
      this._router.navigate(['/lista-clientes'])
    })
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

  search(e: any): void {
    const target = e.target.value || null
    if(!target){
      this.getAllClients();
      return
    }
    // const value = target.value
    const filtered = this.Clients.filter(s => s.nome.toLowerCase().includes(target.toLowerCase()))
    if(filtered.length > 0) {
      this.Clients = filtered
    } else {
      this.getAllClients()
    }

  }

}
