import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['dashboard'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
  }
}