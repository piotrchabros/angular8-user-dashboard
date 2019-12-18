import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent
    ],
})
export class AuthModule { }
