import { UsersService } from '../users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../users-list/users-list.component';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'confirm-delete-user-dialog',
    templateUrl: 'confirm-delete-user-dialog.html',
})
export class ConfirmDeleteUserDialog {

    constructor(
        private usersService: UsersService,
        public dialogRef: MatDialogRef<ConfirmDeleteUserDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.usersService.deleteUser(this.data.user).subscribe();
        this.dialogRef.close(true);
    }
}