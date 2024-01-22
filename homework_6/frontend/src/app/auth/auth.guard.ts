import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isAuthenticated();

  if (state.url === "/login" || state.url === "/register") {
    return true;
  }

  if (!isAuthenticated) {
    inject(Router).navigate(["/register"]);
    return false;
  }

  return true;
};
