import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  invalidLogin = false;

  constructor(private router: Router, private loginservice: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginservice.authenticate(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      ).subscribe(
        data => {
          this.router.navigate(['dashboard']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      );
    }
  }
}