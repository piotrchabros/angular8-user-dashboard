import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../users-add/PasswordsMustMatch";
import { User } from "../user";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../users.service";
import { ToastrService } from "ngx-toastr";
import { Role } from "../role";
import { RolesService } from "../roles.service";

@Component({
  selector: "app-users-edit",
  templateUrl: "./users-edit.component.html",
  styleUrls: ["./users-edit.component.css"]
})
export class UsersEditComponent implements OnInit {
  user: User = new User();
  roles: Role[];
  id: number;
  userForm: FormGroup;
  selectedOption = [];

  constructor(
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.usersService.getUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.userForm.get("username").setValue(this.user.username);
      this.selectedOption = this.user.roles.map(role => {
        return role.id;
      });
    });
    this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  createForm() {
    this.userForm = this.formBuilder.group(
      {
        password: ["", Validators.required],
        username: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validators: MustMatch("password", "confirmPassword")
      }
    );
  }

  saveForm() {
    this.user.username = this.userForm.get("username").value;
    this.user.password = this.userForm.get("password").value;
    if (
      this.user.password.trim().length > 0 &&
      this.user.password.trim() === this.userForm.get("confirmPassword").value
    ) {
      this.usersService.updateUser(this.user, this.id).subscribe(
        data => {
          this.toastr.success("Success!", "User updated");
        },
        error => {
          this.toastr.error(error.message, "error");
        }
      );
    } else {
      this.toastr.warning("Form validation errors", "Warning");
    }
  }

  onRoleChanged(roles: number[]): void {
    this.user.roles = this.roles.filter(role => roles.indexOf(role.id) >= 0)
  }
}
