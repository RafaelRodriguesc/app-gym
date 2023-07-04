import { Clients } from './../models/clients';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientesService {

  urlApiClients: string = 'http://localhost:3000/clientes'

  constructor(
    private _http: HttpClient
  ) { }

  getAllClients (): Observable<any> {
    this._http.get(this.urlApiClients).subscribe(data => {
    })
    return this._http.get(this.urlApiClients)
  }

  postClient(params: any): Observable<Clients> {
    return this._http.post<Clients>(this.urlApiClients, params)
  }

  putCliente(params: any): Observable<any> {
    return this._http.put<any>(this.urlApiClients+"/"+params.id, params)
  }

  deleteitem(params:any): Observable<any>{
    const tabela = params.tabela
    const id = params.id
    return this._http.delete<any>(this.urlApiClients+'/'+id)
  }
}
