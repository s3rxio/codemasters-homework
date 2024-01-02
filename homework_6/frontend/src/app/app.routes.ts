import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: "",
    title: "Home",
    loadComponent: () =>
      import("./home-page/home-page.component").then(m => m.HomePageComponent),
    canActivate: [authGuard]
  },
  {
    path: "login",
    title: "Login",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./login-page/login-page.component").then(
        m => m.LoginPageComponent
      )
  },
  {
    path: "register",
    title: "Register",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./register-page/register-page.component").then(
        m => m.RegisterPageComponent
      )
  },
  {
    path: "**",
    redirectTo: "/"
  }
];
