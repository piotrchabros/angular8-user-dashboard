import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmDeleteUserDialogComponent } from '../dialogs/confirm-user-delete-dialog';
import { filter } from 'rxjs/operators';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  totalElements: number;
  pageSize = 10;
  pageNumber = 0;
  users: User[];
  displayedColumns: string[] = ['id', 'username', 'enabled', 'createdAt', 'updatedAt', 'actions'];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usersService: UsersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.downloadUsersAndUpdatePage();
  }

  editUser(user: User): void {
    this.router.navigate(['/users', user.id])
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteUserDialogComponent, {
      width: '250px',
      data: { user }
    });

    dialogRef.afterClosed()
      .pipe(filter(data => !!data))
      .subscribe(data => {
        this.toastr.info('User deleted', 'Info');
        this.downloadUsersAndUpdatePage();
      });
  }

  changePage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.downloadUsersAndUpdatePage();
  }

  private downloadUsersAndUpdatePage(): void {
    this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe((pageInfo: any) => {
      this.users = pageInfo.content;
      this.totalElements = pageInfo.totalElements;
      this.pageSize = pageInfo.size;
      this.pageNumber = pageInfo.number;
    });
  }
}
