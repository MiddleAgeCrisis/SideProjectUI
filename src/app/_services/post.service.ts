import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/post.model';
import { GenericDataModel } from '../_models/token.model';

const API_URL = 'http://localhost:8080/posts/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.http.get<GenericDataModel<Post>>('http://localhost:8080/posts', { responseType: 'json' });
  }
 
  getAllJobPostsByUserID(userID: number|undefined, page?:number|undefined, size?:number|undefined): Observable<any> {
    let pageString = (page != null ? '?page=' + page?.toString() : '');
    let sizeString = (size != null ? (pageString == '' ? '?' : '&') + 'size=' + size.toString():'');
    console.log(pageString); 
    console.log(sizeString); 
    
    return this.http.get<GenericDataModel<Post>>(API_URL + '/job/' + userID?.toString() + pageString + sizeString, { responseType: 'json' });
  }

}