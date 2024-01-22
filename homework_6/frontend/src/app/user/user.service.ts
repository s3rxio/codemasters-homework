import { AuthService } from "@/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  fetchMe() {
    return this.http.get<User>("/users/me");
  }

  getMe() {
    return localStorage.getItem("user");
  }

  setMe() {
    const user = this.fetchMe().subscribe((user: User) => {
      localStorage.setItem("user", JSON.stringify(user));
    });

    return user;
  }
}
