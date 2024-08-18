import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RmButtonComponent,
  RmSelectComponent,
  RmTextInputComponent,
} from '../../shared';
import { Store } from '@ngrx/store';
import { RobotActions, robotTypeFeature } from '../../../store';
import { RobotCreate, RobotType } from '../../../types';
import { isFormFieldError } from '../../util';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'create-robot',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RmButtonComponent,
    RmTextInputComponent,
    RmSelectComponent,
  ],
  templateUrl: './create-robot.component.html',
})
export class CreateRobotComponent implements OnInit {
  public robotTypes$: Observable<readonly RobotType[]> = of([]);

  public readonly form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    robotTypeId: new FormControl<number>(0, [
      Validators.required,
      Validators.pattern(/^[1-9]\d{0,10}$/),
    ]),
  });

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.robotTypes$ = this.store
      .select(robotTypeFeature.selectRobotTypes)
      .pipe(map((robotTypes) => robotTypes ?? []));
  }

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const robotTypeId = this.form.value.robotTypeId ?? undefined;

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
