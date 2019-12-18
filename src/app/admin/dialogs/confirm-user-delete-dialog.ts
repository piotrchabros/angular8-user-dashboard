import { UsersService } from '../services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../users-list/users-list.component';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-confirm-delete-user-dialog',
    templateUrl: 'confirm-delete-user-dialog.html',
    styleUrls: ['./confirm-delete-user-dialog.css']
})
export class ConfirmDeleteUserDialogComponent {

    constructor(
        private usersService: UsersService,
        public dialogRef: MatDialogRef<ConfirmDeleteUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.usersService.deleteUser(this.data.user).subscribe();
        this.dialogRef.close(true);
    }
}