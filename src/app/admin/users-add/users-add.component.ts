import { Component, OnInit, EventEmitter } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MustMatch } from './PasswordsMustMatch';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../role';
import { RolesService } from '../roles.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  user: User = new User()
  roles: Role[]
  userAddForm: FormGroup
  rolesControl = new FormControl()

  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.createForm()
  }

  ngOnInit() {
    this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles
    })
  }

  createForm() {
    this.userAddForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  add() {
    this.user.password = this.userAddForm.get('password').value
    this.user.username = this.userAddForm.get('username').value
    if (this.user.password.trim().length > 0 && this.user.password.trim() === this.userAddForm.get('confirmPassword').value) {
      this.usersService.addUser(this.user).subscribe(data => {
        this.toastr.success('Success!', 'User created')
      },
        error => {
          this.toastr.error(error.error, 'error')
        })
    } else {
      this.toastr.warning('Form validation errors', 'Warning')
    }
  }

  onRoleChanged(eventValue: Role[]) {
    this.user.roles = eventValue
  }

}
