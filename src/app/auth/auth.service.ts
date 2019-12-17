import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../admin/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDetails } from './user-details';
import { AuthorityEnum } from './authority-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<UserDetails>;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('currentUser', JSON.stringify(userData.userDetails));
          this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(sessionStorage.getItem('currentUser')));
          sessionStorage.setItem('username', username)
          let tokenStr = 'Bearer ' + userData.token
          sessionStorage.setItem('token', tokenStr)
          return userData;
        }
      )
    )
  }

  public get currentUserValue(): UserDetails {
    return this.currentUserSubject.value;
  }

  isAdmin() {
    return this.currentUserSubject.value.authorities.find(authority => authority.authority == AuthorityEnum.ROLE_ADMIN) !== undefined
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('currentUser')
  }
}
