import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@/app/auth/auth.service";
import { environment } from "@/environments/environment";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  req = req.clone({
    url: environment.api.url + req.url,
    setHeaders: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined
  });
  return next(req);
};
