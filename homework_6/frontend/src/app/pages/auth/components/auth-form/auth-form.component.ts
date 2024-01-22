import { Component, Input } from "@angular/core";
import { AuthType } from "../../auth";
import { FormBuilder, Validators } from "@angular/forms";
import { isNumberString } from "@/app/shared/validators/isNumberString.validator";
import { AuthService } from "@/app/auth/auth.service";
import { UserService } from "@/app/user/user.service";
import { Router } from "@angular/router";
import { AuthDto } from "@/app/auth/auth";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.scss"
})
export class AuthFormComponent {
  @Input({ required: true }) type: AuthType = "register";
  @Input() submitLabel!: string;

  authForm = this.fb.nonNullable.group({
    username: ["", [Validators.required]],
    code: ["", [Validators.required, isNumberString]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    const username = this.authForm.controls.username;
    const code = this.authForm.controls.code;

    const authDto: AuthDto = {
      username: username.value,
      code: code.value
    };

    switch (this.type) {
      case "register":
        this.authService.register(authDto).subscribe(
          res => this.auth(res.token),
          err => this.catchError(err)
        );
        break;
      case "login":
        this.authService.login(authDto).subscribe(
          res => this.auth(res.token),
          err => this.catchError(err)
        );
        break;
    }
  }

  private auth(token: string) {
    console.log("asd");

    this.authService.setToken(token);
    this.userService.setMe();

    this.router.navigateByUrl("/");
  }

  private catchError(errRes: HttpErrorResponse) {
    return this.authForm.setErrors({
      fromServer: errRes.error.message
    });
  }
}
