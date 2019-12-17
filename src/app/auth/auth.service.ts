import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../admin/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDetails } from './userDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: UserDetails

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username, password }).pipe(
      map(
        userData => {
          this.userDetails = userData.userDetails
          sessionStorage.setItem('username', username)
          let tokenStr = 'Bearer ' + userData.token
          sessionStorage.setItem('token', tokenStr)
          return userData;
        }
      )
    )
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userDetails')
  }
}
