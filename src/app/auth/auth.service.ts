import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './user-details';
import { AuthorityEnum } from './authority-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<UserDetails>;
  isAdmin: boolean;

  constructor(
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('currentUser')));
  }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username, password }).pipe(
      map(
        userData => {
          localStorage.setItem('currentUser', JSON.stringify(userData.userDetails));
          this.currentUserSubject.next(userData.userDetails);

          // this.isAdmin = this.currentUserSubject.value.authorities
          // .find(authority => authority.authority === AuthorityEnum.ROLE_ADMIN) !== undefined;

          sessionStorage.setItem('username', username);
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    )
  }

  public get currentUserValue(): UserDetails {
    return this.currentUserSubject.value;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('currentUser');
  }
}
