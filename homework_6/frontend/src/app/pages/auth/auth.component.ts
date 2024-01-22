import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthType } from "./auth";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss"
})
export class AuthComponent implements OnInit {
  type: AuthType = "register";
  title = "Auth";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get("type") || "register";

    if (type !== "register" && type !== "login") {
      this.router.navigateByUrl("/");
      return;
    }

    this.type = type;
    this.title = type[0].toUpperCase() + type.slice(1);
    this.titleService.setTitle("Just chat | " + this.title);
  }
}
