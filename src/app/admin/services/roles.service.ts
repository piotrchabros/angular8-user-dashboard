import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<object> {
    return this.httpClient.get('http://localhost:8080/roles');
  }

}
