import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  //private url:string = 'http://localhost:8080/pessoas';
  private url:string = 'https://hurt-flower-production.up.railway.app/pessoas';

  constructor(private http:HttpClient) {}

  selecionar():Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  cadastrar(obj:Pessoa):Observable<Pessoa>{
    return this.http.post<Pessoa>(this.url, obj);
  }

  editar(obj:Pessoa):Observable<Pessoa>{
    return this.http.put<Pessoa>(this.url + '/' + obj.id, obj);
  }

  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id);
  }
}