import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomepageComponent } from './public/homepage/homepage.component'
import { LoginComponent } from './auth/login/login.component'
import { LogoutComponent } from './auth/logout/logout.component'
import { NotFoundComponent } from './public/not-found/not-found.component';
import { AuthGuardService } from './auth/auth.guard';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { UsersAddEditComponent } from './admin/users-add-edit/users-add-edit.component';
import { RoleAuthGuard } from './auth/role-auth.guard';
import { AuthorityEnum } from './auth/authority-enum';
import { SignupComponent } from './public/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'home',
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
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuardService, RoleAuthGuard],
    data: { authorities: [AuthorityEnum.ROLE_ADMIN] }
  },
  {
    path: 'users/add',
    component: UsersAddEditComponent,
    canActivate: [AuthGuardService, RoleAuthGuard],
    data: { authorities: [AuthorityEnum.ROLE_ADMIN] }
  },
  {
    path: 'users/:id',
    component: UsersAddEditComponent,
    canActivate: [AuthGuardService, RoleAuthGuard],
    data: { authorities: [AuthorityEnum.ROLE_ADMIN] }
  },
  {
    path: 'signup',
    component: SignupComponent
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
