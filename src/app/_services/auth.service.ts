import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { map, Observable, Subscription } from 'rxjs';
import { GenericDataModel } from '../_models/token.model';
import { Token } from '../_models/token.model';
import { User } from '../_models/user.model';

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
    return this.http.post<GenericDataModel<User>>('http://localhost:8080/user/login', body, {headers: headers, withCredentials: true})
      .pipe(map(res => { 
        sessionStorage.setItem('user', JSON.stringify(res.data)); 
        return res;
      }));
  }

  logout(){
    sessionStorage.removeItem('user'); 
  }

  isUserLoggedIn() { 
    let user:User = JSON.parse(sessionStorage.getItem('user') || '{}');  
    if (user.id != null) { 
      return true;
    }
    return false;
  }

}
