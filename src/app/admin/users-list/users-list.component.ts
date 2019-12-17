import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  totalElements: number
  pageSize: number = 10
  pageNumber: number = 0
  users: User[]
  displayedColumns: string[] = ['id', 'name', 'surname', 'username', 'email', 'enabled', 'actions'];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usersService: UsersService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe((pageInfo: any) => {
      this.users = pageInfo.content
      this.totalElements = pageInfo.totalElements
      this.pageSize = pageInfo.size
      this.pageNumber = pageInfo.number
    })
  }

  editUser(user: User) {
    this.router.navigate(['/users', user.id])
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDeleteUserDialog, {
      width: '250px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.toastr.info('User deleted', 'Info')
        this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe((pageInfo: any) => {
          this.users = pageInfo.content
        })
      }
    })
  }

  changePage(event: PageEvent) {
    this.pageNumber = event.pageIndex
    this.pageSize = event.pageSize
    this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe((pageInfo: any) => {
      this.users = pageInfo.content
    })
  }
}

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
