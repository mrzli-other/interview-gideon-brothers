import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RmButtonComponent, RmTextInputComponent } from '../../shared';
import { Store } from '@ngrx/store';
import { RobotActions } from '../../../store';
import { RobotCreate } from '../../../types';
import { isFormFieldError } from '../../util';
import { parseIntOrThrow, transformIfNotUndefined } from '../../../util';

@Component({
  selector: 'create-robot',
  standalone: true,
  imports: [ReactiveFormsModule, RmButtonComponent, RmTextInputComponent],
  templateUrl: './create-robot.component.html',
})
export class CreateRobotComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    robotTypeId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]\d{0,10}$/),
    ]),
  });

  public constructor(private readonly store: Store) {}

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const robotTypeId = transformIfNotUndefined(
      this.form.value.robotTypeId ?? undefined,
      parseIntOrThrow,
    );

    if (robotTypeId === undefined) {
      return;
    }

    const data: RobotCreate = {
      name: this.form.value.name ?? '',
      robotTypeId,
    };

    this.store.dispatch(RobotActions.create({ payload: data }));
  }

  public isError(field: string): boolean {
    return isFormFieldError(this.form, field);
  }
}
