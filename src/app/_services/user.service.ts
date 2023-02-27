import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { GenericDataModel } from '../_models/token.model';

const API_URL = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByID(id: number): Observable<any> {
    return this.http.get<GenericDataModel<User>>(API_URL + id.toString(), { responseType: 'json' });
  }
 
}