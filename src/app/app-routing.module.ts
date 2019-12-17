import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomepageComponent } from './homepage/homepage.component'
import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './logout/logout.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component'
import { AuthGuardService } from './auth/auth.guard';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { UsersAddComponent } from './admin/users-add/users-add.component';
import { UsersEditComponent } from './admin/users-edit/users-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'users/add',
    component: UsersAddComponent
  },
  {
    path: 'users/:id',
    component: UsersEditComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  DashboardComponent,
  HomepageComponent,
  LoginComponent,
  LogoutComponent,
  NotFoundComponent,
  RegisterComponent,
  UsersListComponent,
  UsersAddComponent,
  UsersEditComponent
]
