import { UserService } from "@/app/user/user.service";
import { Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { UserModule } from "./user/user.module";

@Component({
  host: { class: "app" },
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterOutlet, FooterComponent, UserModule]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.setMe();
  }
}
