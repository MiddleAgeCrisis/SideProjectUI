import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { map, Observable, Subscription } from 'rxjs';
import { GenericDataModel } from '../_models/token.model';
import { Token } from '../_models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  public username: any;
  public password: any;

  constructor(private http: HttpClient) {}

  login(username: String, password: String):Observable<Object> {
    const body = JSON.stringify({ username: username, password: password });
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<GenericDataModel<Token>>('http://localhost:8080/user/login', body, {headers: headers})
      .pipe(map(res => {
        sessionStorage.setItem('token', JSON.stringify(res.data));

        return res;
      }));
  }

  logout(){
    sessionStorage.removeItem('token'); 
  }

  isUserLoggedIn() { 
    let token = <Token>JSON.parse(sessionStorage.getItem('token') || '{}'); 
    if (token.token) { 
      return true;
    }
    return false;
  }

}
