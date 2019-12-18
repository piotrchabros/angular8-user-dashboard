import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(page: number, size: number) {
    return this.httpClient.get('http://localhost:8080/users?page=' + page + '&size=' + size);
  }

  getUser(id: number): Observable<object> {
    return this.httpClient.get('http://localhost:8080/users/' + id);
  }

  updateUser(user: User, id: number): Observable<object> {
    return this.httpClient.put('http://localhost:8080/users/' + id,
      {
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: user.password,
        email: user.email,
        country: user.country,
        language: user.language,
        company: user.company,
        employees: user.employees,
        phone: user.phone,
        roles: user.roles,
        enabled: 1
      });
  }

  addUser(user: User): Observable<object> {
    return this.httpClient.post('http://localhost:8080/users',
      {
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: user.password,
        email: user.email,
        country: user.country,
        language: user.language,
        company: user.company,
        employees: user.employees,
        phone: user.phone,
        roles: user.roles,
        enabled: 1
      });
  }

  deleteUser(user: User): Observable<object> {
    return this.httpClient.delete('http://localhost:8080/users/' + user.id)
  }
}
