import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";
import { AuthModule } from "./pages/auth/auth.module";

export const routes: Routes = [
  {
    path: "",
    title: "Home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: "chat/:id",
    title: "Chat",
    loadChildren: () =>
      import("./pages/chat/chat.module").then(m => m.ChatModule),
    canActivate: [authGuard]
  },
  {
    path: "auth/:type",
    title: "Auth",
    providers: [AuthModule],
    loadChildren: () =>
      import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: "/"
  }
];
