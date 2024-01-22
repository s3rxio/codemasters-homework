import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { FormComponent } from "../../shared/components/form/form.component";
import { TextFieldComponent } from "../../shared/components/text-field/text-field.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { UserModule } from "@/app/user/user.module";

@NgModule({
  declarations: [AuthComponent, AuthFormComponent],
  imports: [
    CommonModule,
    FormComponent,
    TextFieldComponent,
    ReactiveFormsModule,
    AuthRoutingModule,
    UserModule
  ]
})
export class AuthModule {
  constructor() {}

  loadComponent() {
    return import("./auth.component").then(m => m.AuthComponent);
  }
}
