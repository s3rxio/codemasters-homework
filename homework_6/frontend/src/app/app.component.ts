import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  host: { class: "app" },
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent]
})
export class AppComponent {}
