import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthDto, AuthResponse } from "./auth";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getPayload() {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken(token);
  }

  isAuthenticated() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const payload = this.jwtHelper.decodeToken(token);

    return !!payload;
  }

  logout() {
    localStorage.removeItem("token");
  }

  login(loginDto: AuthDto) {
    return this.http.post<AuthResponse>("/auth/login", loginDto);
  }

  register(registerDto: AuthDto) {
    return this.http.post<AuthResponse>("/auth/register", registerDto);
  }
}
