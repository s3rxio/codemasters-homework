import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: "app-text-field",
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextFieldComponent
    }
  ],
  templateUrl: "./text-field.component.html",
  styleUrl: "./text-field.component.scss"
})
export class TextFieldComponent implements ControlValueAccessor, Validator {
  @Input() type: string = "text";
  @Input() id!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() value = "";
  @Input() disabled = false;
  errors: ValidationErrors | null = null;

  constructor() {}

  onChange(_value?: string) {}

  onTouched() {}

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = control.errors;

    return null;
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: (_?: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
