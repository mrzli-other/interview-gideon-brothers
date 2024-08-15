import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'create-robot-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-robot-type.component.html',
})
export class CreateRobotTypeComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    dimensions: new FormControl('', [
      // Validators.required,
      // Validators.minLength(1),
      // Validators.maxLength(4096),
    ]),
  });

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
