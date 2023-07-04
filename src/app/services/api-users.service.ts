import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  urlApiUsers: string = 'http://localhost:3000/usuarios'

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers (): Observable<any> {
    this._http.get(this.urlApiUsers).subscribe(data =>{
    })
    return this._http.get(this.urlApiUsers)

  }

  postUser(params: any): Observable<Users> {
    return this._http.post<Users>(this.urlApiUsers, params)

  }
  putUser(params: any): Observable<any> {
    return this._http.put<any>(this.urlApiUsers+"/"+params.id, params)
  }

  deleteitem(params:any): Observable<any>{
    const tabela = params.tabela
    const id = params.id
    return this._http.delete<any>(this.urlApiUsers+'/'+id)
  }
}
