import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MustMatch } from './passwords-must-match-validator';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.css']
})
export class UsersAddEditComponent implements OnInit {
  user: User = new User();
  roles: Role[];
  id: number;
  userForm: FormGroup;
  selectedOption = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    if (this.id) {
      this.usersService.getUser(this.id).subscribe((data: User) => {
        this.user = data;
        this.selectedOption = this.user.roles.map(role => {
          return role.id;
        });
        this.fillForm();
      });
    }
    this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  fillForm(): void {
    this.userForm.get('username').setValue(this.user.username);
    this.userForm.get('name').setValue(this.user.name);
    this.userForm.get('surname').setValue(this.user.surname);
    this.userForm.get('email').setValue(this.user.employees);
    this.userForm.get('phone').setValue(this.user.phone);
    this.userForm.get('employees').setValue(this.user.employees);
    this.userForm.get('country').setValue(this.user.country);
    this.userForm.get('language').setValue(this.user.language);
    this.userForm.get('company').setValue(this.user.company);
    this.userForm.get('roles').setValue(this.user.roles.map(role => role.id));
  }

  createForm(): void {
    this.userForm = this.formBuilder.group(
      {
        password: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        name: new FormControl(''),
        surname: new FormControl(''),
        roles: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        country: new FormControl(''),
        language: new FormControl(''),
        company: new FormControl(''),
        employees: new FormControl(''),
        enabled: new FormControl({ value: true, disabled: true })
      },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );
  }

  saveForm(): void {
    if (this.userForm.valid) {
      this.fillUser();
      if (this.id) {
        this.usersService.updateUser(this.user, this.id).subscribe(
          data => {
            this.toastr.success('Success!', 'User updated');
          },
          error => {
            this.toastr.error(error.message, 'error');
          }
        );
      } else {
        this.usersService.addUser(this.user).subscribe(
          data => {
            this.toastr.success('Success!', 'User added');
          },
          error => {
            this.toastr.error(error.message, 'error');
          }
        );
      }
    } else {
      this.toastr.warning('Form validation errors', 'Warning');
    }
  }

  fillUser(): void {
    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;
    this.user.name = this.userForm.get('name').value;
    this.user.surname = this.userForm.get('surname').value;
    this.user.email = this.userForm.get('email').value;
    this.user.phone = this.userForm.get('phone').value;
    this.user.employees = this.userForm.get('employees').value;
    this.user.country = this.userForm.get('country').value;
    this.user.language = this.userForm.get('language').value;
    this.user.company = this.userForm.get('company').value;
    this.user.roles = this.roles.filter(role => this.userForm.get('roles').value.indexOf(role.id) >= 0);
  }

  onRoleChanged(roles: number[]): void {
    this.user.roles = this.roles.filter(role => roles.indexOf(role.id) >= 0);
  }

  backToUserList(): void {
    this.router.navigate(['/users']);
  }
}
