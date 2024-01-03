import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-form",
  standalone: true,
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
  imports: [CommonModule, ButtonComponent]
})
export class FormComponent {
  @Input() error!: string;
  @Input() btnText: string = "Submit";
  @Input() btnDisabled: boolean = false;

  constructor() {}
}
