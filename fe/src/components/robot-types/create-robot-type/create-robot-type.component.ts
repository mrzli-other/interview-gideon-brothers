import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RobotTypeActions } from '../../../store';
import { Point, RobotTypeCreate } from '../../../types';
import {
  RmButtonComponent,
  RmDimensionsComponent,
  RmTextInputComponent,
} from '../../shared';
import { isFormFieldError } from '../../util';

@Component({
  selector: 'create-robot-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RmButtonComponent,
    RmTextInputComponent,
    RmDimensionsComponent,
  ],
  templateUrl: './create-robot-type.component.html',
})
export class CreateRobotTypeComponent {
  public form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    dimensions: new FormControl<readonly Point[]>([], [Validators.required]),
  });

  public constructor(private readonly store: Store) {}

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const data: RobotTypeCreate = {
      name: this.form.value.name ?? '',
      dimensions: this.form.value.dimensions ?? [],
    };

    this.store.dispatch(RobotTypeActions.create({ payload: data }));
  }

  public isError(field: string): boolean {
    return isFormFieldError(this.form, field);
  }
}
