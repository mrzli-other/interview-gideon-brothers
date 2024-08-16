import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RobotTypeActions } from '../../../store';
import { RobotTypeCreate } from '../../../types';
import { RmButtonComponent, RmTextInputComponent } from '../../shared';

@Component({
  selector: 'create-robot-type',
  standalone: true,
  imports: [ReactiveFormsModule, RmButtonComponent, RmTextInputComponent],
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
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(4096),
    ]),
  });

  public constructor(private readonly store: Store) {}

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const data: RobotTypeCreate = {
      name: this.form.value.name ?? '',
      dimensions: this.form.value.dimensions ?? '',
    };

    this.store.dispatch(RobotTypeActions.create({ payload: data }));
  }
}
