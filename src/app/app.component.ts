import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './admin/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User

  constructor(private authService: AuthService) {
  }

  isAdmin(): boolean {
    return true
  }

}
