import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';
import { MaterialModule } from '../material/material.module';
import { SlicePipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDeleteUserDialogComponent } from './dialogs/confirm-user-delete-dialog';

@NgModule({
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    declarations: [
        UsersListComponent,
        UsersAddEditComponent,
        ConfirmDeleteUserDialogComponent
    ],
    providers: [
        DatePipe
    ],
    entryComponents: [ConfirmDeleteUserDialogComponent]
})
export class AdminModule { }
