import { ApplicationConfig, importProvidersFrom, inject } from "@angular/core";
import { TitleStrategy, provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import { TemplateTitleStrategy } from "./shared/strategies/template-title.strategy";
import { apiInterceptor } from "./shared/interceptors/api.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./auth/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => inject(AuthService).getToken() || ""
        }
      })
    ),
    {
      provide: TitleStrategy,
      useClass: TemplateTitleStrategy
    }
  ]
};
