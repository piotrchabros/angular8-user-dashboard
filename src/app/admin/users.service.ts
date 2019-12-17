import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get("http://localhost:8080/users")
  }

  getUser(id: number): Observable<Object> {
    return this.httpClient.get("http://localhost:8080/users/" + id)
  }

  updateUser(user: User, id: number): Observable<Object> {
    return this.httpClient.put("http://localhost:8080/users/" + id,
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
        enabled: 1
      })
  }

  addUser(user: User): Observable<Object> {
    return this.httpClient.post("http://localhost:8080/users",
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
      }) //TODO: this cannot be converted by JSON.stringify(user)
  }

  deleteUser(user: User) {
    return this.httpClient.delete("http://localhost:8080/users/" + user.id)
  }
}
